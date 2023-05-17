require('dotenv').config();
const express = require('express'); // bring in express package
const routes = require('./routes'); // bring in all routes
const db = require('./config/connection') // database connection

const app = express(); // create an express app server
const PORT = process.env.PORT || 5001; // set the port to 3001
console.log(PORT);
app.use(express.json()); // use express.json() middleware to receive and use json data
app.use(express.urlencoded({ extended: true })); // use express.urlencoded() middleware to receive and use encoded data
app.use('/', routes); // use the routes

db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`App running on port ${PORT}!`);
	});
});
