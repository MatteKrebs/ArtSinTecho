
// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  next();
};
 
// if an already logged in user tries to access the login page it
// redirects the user to the home page
const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};


// checks if the user is admin in when trying to access a specific page

const isAdmin = (req, res, next) => {

  const currentUser = req.session.currentUser;
  
  if (!currentUser || currentUser.isAdmin !== true) {
    return res.redirect('/');
  }
  next();
};
 

 
module.exports = {
  isLoggedIn,
  isLoggedOut,
  isAdmin
};