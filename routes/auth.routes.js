const bcrypt = require ('bcrypt');
const saltRounds = 10;

const User = require('../models/User.model')

const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/signup", (req, res, next) => {
    res.render('auth/signup')
  });


/* GET home page */
router.post("/signup", (req, res, next) => {
  
    const {username, password, city, isAdmin, userPicture} = req.body;

    bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
          username,
          city,
          isAdmin,
          userPicture,
          password: hashedPassword
        });
      })
      .then(userFromDB => {
        console.log('New user added', userFromDB);
        res.redirect(`/auth/profile/${userFromDB.username}`)
      })
      .catch(error => next(error));
  });



/* GET home page */
router.get("/profile/:username", (req, res, next) => {
    User.findOne({username: req.params.username})
      .then(foundUser => {
        console.log('foundUser', foundUser)
        res.render('auth/profile', foundUser)
      })
      .catch(err => console.log(err))
  });


module.exports = router;