const express = require('express');
const router = express.Router();

const Artwork = require('../models/Artwork.model');
const Artist = require('../models/Artist.model');

const {isAdmin} = require('../middleware/route-guard')

const fileUploader = require('../config/cloudinary.config');


//Get: Create new artwork
router.get("/artwork/create", isAdmin, (req, res, next) => {

    Artist.find()
        .then((artists) => {
            res.render('artwork/artwork-create', {artists, loggedIn: true, isAdmin: true});
            console.log(artists);
        })
        .catch((error) => {
            console.log(error);
            res.redirect('/artwork');
        });
});

router.post("/artwork/create", isAdmin, fileUploader.single('imageURL'), (req, res, next) => {

    const {title, artist, story, mood, dateOfCompletion} = req.body;
    const imageURL = req.file.path; 

    Artwork.create({ title, artist, story, mood, dateOfCompletion, imageURL})
    .then((newArt) => {
      console.log(newArt);
      const {_id} = newArt;
    Artist.findByIdAndUpdate(artist, {$push:{works:_id}});

    console.log('req.file', req.file);
    console.log('req.body', req.body);


      res.redirect("/artwork");
    })
    .catch((error) => console.log(`Error while creating a new artwork: ${error}`));
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
            res.render('artwork/artwork', {artworks, loggedIn: true});
        })
        .catch(() => console.log("error fetching artworks"))
});



 
//Get: Display single artwork
router.get("/artwork/:id", (req, res, next) => {

    const artworkId = req.params.id;

        if(req.session.currentUser){
        
            Artwork.findById(artworkId)
            .populate("artist")
            .then((data) => {
                console.log(data)
                res.render('artwork/artwork-details', {data, loggedIn: true, isAdmin:req.session.currentUser.isAdmin});
            })
            .catch((error) => {
            console.log("error fetching artwork", error);
            res.render('error');
            });
        }
        else if(req.session.currentUser){
            Artwork.findById(artworkId)
            .populate("artist")
            .then((data) => {
                console.log(data)
                res.render('artwork/artwork-details', {data, loggedIn: true});
            })
            .catch((error) => {
                console.log("error fetching artwork", error);
                res.render('error');
                });
        }
        else{
            Artwork.findById(artworkId)
            .populate("artist")
            .then((data) => {
                console.log(data)
                res.render('artwork/artwork-details', {data});
            })
            .catch((error) => {
                console.log("error fetching artwork", error);
                res.render('error');
                });
        }

});




//Post: Delete Artwork

router.post('/artwork/:id/delete', isAdmin, (req,res) => {

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
        res.render('error', {isAdmin: true});
        });
})



// Get: Editing Artwork

router.get('/artwork/:id/edit', isAdmin, (req,res) => {

    const artworkId = req.params.id;

    Artwork.findById(artworkId)
        .populate('artist')
        .then ((artwork)=> {
            Artist.find()
                .then((artwork) => {
                    res.render('./artwork/artwork-edit', {artwork, artist, loggedIn: true, isAdmin: true});
                })
                .catch((error) => {
                    console.log("error rendering artwork", error);
                    res.render('error', {isAdmin: true});
                });
        })
        .catch ((error) => {
            console.log("error fetching movie", error);
            res.render('error', {isAdmin: true});
        });
});

// Post: Editing Artwork

router.post('/artwork/:id', isAdmin, (req,res) => {

    const artworkId = req.params.id;
    const {imageURL, title, artist, story, mood, dateOfCompletion} = req.body;

    Artwork.findByIdAndUpdate(artworkId, {imageURL, title, artist, story, mood, dateOfCompletion})
        .then (()=> 
            res.redirect(`/artwork/${artworkId}`))
        .catch((error) => {
        console.log("error editing artwork", error);
        res.render('error', {isAdmin: true});
        });
})


module.exports = router;


