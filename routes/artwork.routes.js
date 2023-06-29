const express = require('express');
const router = express.Router();


const Artwork = require('../models/Artwork.model');
const Artist = require('../models/Artist.model');



//Get: Create new artwork
router.get("/artwork/create", (req, res, next) => {
    Artist.find()
        .then((artists) => {
            res.render('artwork/artwork-create', {artists});
            console.log(artists);
        })
        .catch((error) => {
            console.log(error);
            res.redirect('/artwork');
        });
});

//Post: Create new artwork
router.post("/artwork/create", (req, res, next) => {

    const {imageURL, title, artist, story, mood, dateOfCompletion} = req.body;
    
    // Create a new artwork using the provided data
    const newArtwork = new Artwork({
        imageURL: imageURL, 
        title: title, 
        artist: artist, 
        story: story, 
        mood: mood, 
        dateOfCompletion: dateOfCompletion
    });

    // Save the new artwork to the database
    newArtwork
        .save()
        .then(
            // Redirect to the artist page after successful creation
            res.redirect('/artwork')
        )
        .catch(err => {
            // Handle the error and render the new-artist view again
            res.render('artwork/artwork-create', 
            { error: "please, try again to insert a new artist" });
        });
});




//GET: Display all artwork
router.get('/artwork', (req, res) => {

    Artwork.find()
        .populate('artist')
        .then((artworks)=>{
            res.render('artwork/artwork', {artworks});
        })
        .catch(() => console.log("error fetching artworks"))
});



 
//Get: Display single artwork
router.get("/artwork/:id", (req, res, next) => {

    const artworkId = req.params.id;

    Artwork.findById(artworkId)
        .populate('artist')
        .then((artwork) => {
            res.render('artwork/artwork-details', {artwork});
            console.log(artwork.artist)
        })
        .catch((error) => {
        console.log("error fetching artwork", error);
        res.render('error');
        });
});




//Post: Delete Artwork

router.post('/artwork/:id/delete', (req,res) => {

    const artworkId = req.params.id;

    Artwork.findByIdAndRemove(artworkId)
        .then (res.redirect('/artwork'))
        .catch((error) => {
        console.log("error deleting artwork", error);
        res.render('error');
        });
})




// Get: Editing Movie

router.get('/artwork/:id/edit', (req,res) => {

    const artworkId = req.params.id;

    Artwork.findById(artworkId)
        .populate('artist')
        .then ((artwork)=> {
            Artist.find()
                .then((artists) => {
                    res.render('./artwork/artwork-edit', {artwork, artists});
                })
                .catch((error) => {
                    console.log("error rendering artwork", error);
                    res.render('error');
                });
        })
        .catch ((error) => {
            console.log("error fetching movie", error);
            res.render('error');
        });
});

// Post: Editing Movie

router.post('/artwork/:id', (req,res) => {

    const artworkId = req.params.id;
    const {imageURL, title, artist, story, mood, dateOfCompletion} = req.body;

    Artwork.findByIdAndUpdate(artworkId, {imageURL, title, artist, story, mood, dateOfCompletion})
        .then (()=> 
            res.redirect(`/artwork/${artworkId}`))
        .catch((error) => {
        console.log("error editing artwork", error);
        res.render('error');
        });
})




module.exports = router;