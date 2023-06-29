const express = require('express');
const router = express.Router();



const Artist = require('../models/Artist.model');
const Artwork = require('../models/Artwork.model');


//Get: Create new artist
router.get("/artists/create", (req, res, next) => {
    res.render ('artists/artists-create');
});

//Post: Create new artist
router.post("/artists/create", (req, res, next) => {

    const {name, city, artType, description, pic, links, works} = req.body;

    // Create a new artist using the provided data
    const newArtist = new Artist ({
        name: name, 
        city: city, 
        artType: artType, 
        description: description, 
        pic: pic, 
        links: links, 
        works: works
    });

    // Save the new artist to the database
    newArtist
        .save()
        .then (artist => 
            // Redirect to the artist page after successful creation
            res.redirect('/artists')
        )
        .catch(error => {
            // Handle the error and render the new-artist view again
            res.render('/artists/artists-create', 
            { error: "please, try again to insert a new artist" });
        });
});




// ITERATION 4

router.get('/artists', (req,res) => {

    Artist.find()
        .then((artists)=>{
            res.render('./artists/artists', {artists});
        })
        .catch(() => console.log("error fetching artists"))
});

// ITERATION 4 (END)


// //Get: Display single artist
// router.get("/artists/:artistId", (req, res, next) => {

// });




module.exports = router;