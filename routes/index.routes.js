const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const { trusted } = require('mongoose');


/* GET home page */
router.get("/", (req, res, next) => {
  console.log('req.session', req.session)

  if(req.session.currentUser){
    res.render("index", {loggedIn: true, isAdmin:req.session.currentUser.isAdmin});
  }
  else if(req.session.currentUser){
    res.render("index", {loggedIn: true})
  }
  else{
    res.render("index")
  }
});

module.exports = router;
