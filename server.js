require('dotenv').config();
const express = require('express'); // bring in express package
const mongoose = require('./config/connection'); // bring in mongoose package
const appRoutes = require('./routes/index')// bring in routes package

const app = express(); // create an express app server
const PORT = process.env.PORT || 1337; // set the port to 3001
console.log(PORT);
app.use(express.json()); // use express.json() middleware to receive and use json data
app.use(express.urlencoded({ extended: true })); // use express.urlencoded() middleware to receive and use encoded data
app.use(appRoutes); // use routes package
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
}); // open the app to listen for a request on port 3001
