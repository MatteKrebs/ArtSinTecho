const express = require('express');
const router = express.Router();

//GET: Display all artwork
router.get("/artwork", (req, res, next) => {

});

//Get: Display single artwork
router.get("/:artworkId", (req, res, next) => {

});

//Post: Create new artist
router.post("/create-artwork", (req, res, next) => {

});

//Get: Create new artist
router.get("/:artistId", (req, res, next) => {

});

module.exports = router;