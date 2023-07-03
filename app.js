
// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");
const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/ArtSinTecho')
//     .then(() => console.log('Database good.'))
//     .catch(err => console.log(err));

const express = require("express");
const app = express();

const hbs = require("hbs");
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');

app.use(express.static('public'));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config.js")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "ArtSinTecho";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);


// Import the route files
const artistsRoutes = require('./routes/artist.routes');
const artworkRoutes = require('./routes/artwork.routes');
const authRoutes = require("./routes/auth.routes");

// Link the route files to the main router
app.use('/', artistsRoutes);
app.use('/', artworkRoutes);
app.use('/auth', authRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);


module.exports = app;
