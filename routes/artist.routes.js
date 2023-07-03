const express = require('express');
const router = express.Router();

const Artist = require('../models/Artist.model');
const Artwork = require('../models/Artwork.model');

const fileUploader = require('../config/cloudinary.config');

//Get: Create new artist
router.get("/artists/create", (req, res, next) => {
    res.render ('artists/artists-create');
});


//Post: Create New Artist
router.post("/artist/create", fileUploader.single('ArtistPic'), (req, res, next) => {

    const {name, city, artType, description, links, works} = req.body;

Artist.create({name, city, artType, description, works, pic: 'ArtistPic'})
.then((newArtist) => {
  console.log(newArtist);

    console.log('req.file', req.file);
    console.log('req.body', req.body);

  res.redirect("/artist/:id"); 
})
.catch((error) => console.log('Error while creating a new movie: ${error}'));
})

// OLD POST ROUTE: Create new artist
// router.post("/artists/create", (req, res, next) => {

//     const {name, city, artType, description, pic, links, works} = req.body;

//     // Create a new artist using the provided data
//     const newArtist = new Artist ({
//         name: name, 
//         city: city, 
//         artType: artType, 
//         description: description, 
//         pic: 'ArtistPic', 
//         links: links, 
//         works: works
//     });

//     // Save the new artist to the database
//     newArtist
//         .save()
//         .then (artist => 
//             // Redirect to the artist page after successful creation
//             res.redirect('/artists')
//         )
//         .catch(error => {
//             // Handle the error and render the new-artist view again
//             res.render('./artists/artists-create', 
//             { error: "please, try again to insert a new artist" });
//         });
// });




// Display all the artists

router.get('/artists', (req,res) => {

    Artist.find()
        .then((artists)=>{
            res.render('./artists/artists', {artists});
        })
        .catch(() => console.log("error fetching artists"))
});


 
//Get: Display single artist
router.get("/artists/:id", (req, res, next) => {

    const artistId = req.params.id;

    Artist.findById(artistId)
        .populate("works")
        .then((artist) => {
            console.log(artist)
            res.render('artists/artist-details', {artist});
        })
        
        .catch((error) => {
        console.log("error fetching artwork", error);
        res.render('error');
        });
});



 /////// WE HAVE TO WORK ON THIS NEXT ROUTE
 //Should be able to delete all of the artwork, and then, 
 //delete the artist of those artworks
//Post: Delete artist

router.post('/artists/:id/delete', (req,res) => {

   // const artworkId = req.params.id;
    const artistId = req.params.id;
    const {works} = req.body;


    Artwork.findByIdAndRemove(artistId)
        .then((deletedArtwork)=> {
            const {_id} = deletedArtwork;

            return Artist.findByIdAndUpdate(works, {$pull:{works:_id}})}
        )
        .then(()=>{
            Artist.findByIdAndRemove(artistId)

            .then (()=>res.redirect('/artists'))
            .catch((error) => {
            console.log("error deleting artist", error);
            res.render('error');
            });
        })
        .then (() => res.redirect('/artwork'))
        .catch((error) => {
        console.log("error deleting artwork", error);
        res.render('error');
        });
    
})


// router.post('/artwork/:id/delete', (req,res) => {

//     const artworkId = req.params.id;
//     const {artist} = req.body;


//     Artwork.findByIdAndRemove(artworkId)
//         .then((deletedArtwork)=> {
//             const {_id} = deletedArtwork;
    
//             return Artist.findByIdAndUpdate(artist, {$pull:{works:_id}})}
//         )
//         .then (() => res.redirect('/artwork'))
//         .catch((error) => {
//         console.log("error deleting artwork", error);
//         res.render('error');
//         });
// })







// Get: Editing Artist

router.get('/artists/:id/edit', (req,res) => {

    const artistId = req.params.id;

    Artist.findById(artistId)
        .then ((artist)=> {
            Artist.find()
                .then((artists) => {
                    res.render('./artists/artist-edit', {artists});
                })
                .catch((error) => {
                    console.log("error rendering artist", error);
                    res.render('error');
                });
        })
        .catch ((error) => {
            console.log("error fetching artist", error);
            res.render('error');
        });
});



// Post: Editing Artist

router.post('/artists/:id', (req,res) => {

    const artistId = req.params.id;
    const {name, city, artType, description, pic, works} = req.body;

    Artwork.findByIdAndUpdate(artistId, {name, city, artType, description, pic, works})
        .then (()=> 
            res.redirect(`/artists/${artistId}`))
        .catch((error) => {
        console.log("error editing artists", error);
        res.render('error');
        });
})







module.exports = router;