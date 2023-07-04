const express = require('express');
const router = express.Router();

const Artwork = require('../models/Artwork.model');
const Artist = require('../models/Artist.model');

const {isLoggedIn, isLoggedOut, isAdmin} = require('../middleware/route-guard')

const fileUploader = require('../config/cloudinary.config');


//Get: Create new artwork
router.get("/artwork/create", isLoggedIn, isAdmin, (req, res, next) => {

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

router.post("/artwork/create", isLoggedIn, isAdmin, fileUploader.single('imageURL'), (req, res, next) => {

    const {title, artist, story, mood, dateOfCompletion} = req.body;

    Artwork.create({ title, artist, story, mood, dateOfCompletion, imageUrl: req.file.path })
    .then((newArt) => {
      console.log(newArt);

    console.log('req.file', req.file);
    console.log('req.body', req.body);


      res.redirect("/artwork"); 
    })
    .catch((error) => console.log('Error while creating a new movie: ${error}'));
});



// //Post: Create new artwork
// router.post("/artwork/create", (req, res, next) => {

//     const {imageURL, title, artist, story, mood, dateOfCompletion} = req.body;
    
//     // Create a new artwork using the provided data
//     const newArtwork = new Artwork({
//         imageURL: imageURL, 
//         title: title, 
//         artist: artist, 
//         story: story, 
//         mood: mood, 
//         dateOfCompletion: dateOfCompletion
//     });

//     // Save the new artwork to the database
//     newArtwork
//         .save()
//         .then((createdArtwork) => {
//             const {_id} = createdArtwork;
//             return Artist.findByIdAndUpdate(artist, {$push:{works:_id}})
//             // Redirect to the artist page after successful creation
//         }   
//         )
//         .then (()=> res.redirect("/artwork"))
//         .catch(err => {
//             // Handle the error and render the new-artist view again
//             res.render('artwork/artwork-create', 
//             { error: "please, try again to insert a new artist" });
//         });
// });




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

router.post('/artwork/:id/delete', isLoggedIn, isAdmin, (req,res) => {

    const artworkId = req.params.id;
    const {artist} = req.body;


    Artwork.findByIdAndRemove(artworkId)
        .then((deletedArtwork)=> {
            const {_id} = deletedArtwork;
    
            return Artist.findByIdAndUpdate(artist, {$pull:{works:_id}})}
        )
        .then (() => res.redirect('/artwork'))
        .catch((error) => {
        console.log("error deleting artwork", error);
        res.render('error');
        });
})



// Get: Editing Artwork

router.get('/artwork/:id/edit', isLoggedIn, isAdmin, (req,res) => {

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

// Post: Editing Artwork

router.post('/artwork/:id', isLoggedIn, isAdmin, (req,res) => {

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


