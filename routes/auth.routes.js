const bcrypt = require ('bcrypt');
const saltRounds = 10;

const User = require('../models/User.model')

const express = require('express');
const router = express.Router();



router.get("/signup", (req, res, next) => {
    res.render('auth/signup')
  });


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


router.get('/login', (req,res) =>{
  res.render('auth/login')
})
  

router.post('/login', (req, res, next) => {
    // console.log('req.body', req.body)
    const {username, password} = req.body;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Username is not registered. Try with other username.'});
        return;
      } else if (bcrypt.compareSync(password, user.password)) {
        const {username, city} = user;
        req.session.currentUser = {username, city};
        res.render('auth/profile', user );
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password. Please try again.' });
     }
  })
      .catch(error => next(error));
})



router.get("/profile/:username", (req, res, next) => {

  if(req.session.currentUser) {
    User.findOne({username: req.params.username})
      .then(foundUser => {
        console.log('foundUser', foundUser)
        res.render('auth/profile', foundUser)
      })
      .catch(err => console.log(err))
  }

  else{
  res.render('auth/profile')
  }

});



router.post('/logout', (req , res) =>{
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  })
})


module.exports = router;