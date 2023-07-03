const session = require('express-session');
const MongoStore = require('connect-mongo');
 
module.exports = app => {
  
  app.set('trust proxy', 1);
 
  app.use(
    session({
      secret: 'secretId',
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ArtSinTecho"
    }), //this is going to the mongo atlas!
      cookie: {
        maxAge: 600000 // 60 * 1000 ms === 1 min
      },
    })
  );
};