const express = require('express');
const router = express.Router();


const Artwork = require('../models/Artist.model');



//Get: Create new artwork
router.get("/artwork/create", (req, res, next) => {
    res.render ('artwork/artwork-create');
});

//Post: Create new artwork
router.post("/artwork/create", (req, res, next) => {

    const {imageURL, title, artist, story, mood, dateOfCompletion} = req.body;

    // Create a new artist using the provided data
    const newArtwork = new Artwork ({
        imageURL: imageURL, 
        title: title, 
        artist: artist, 
        story: story, 
        mood: mood, 
        dateOfCompletion: dateOfCompletion
    });

    // Save the new artist to the database
    newArtwork
        .save()
        .then (artwork => 
            // Redirect to the artist page after successful creation
            res.redirect('/artists')
        )
        .catch(error => {
            // Handle the error and render the new-artist view again
            res.render('/artists/artists-create', 
            { error: "please, try again to insert a new artist" });
        });
});




//Get: Display single artwork
router.get("/:artworkId", (req, res, next) => {

});





//GET: Display all artwork
router.get("/artwork", (req, res, next) => {

});

module.exports = router;