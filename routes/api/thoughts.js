const router = require('express').Router();
// brin in thought controllers
const {
	getThoughts,
	getOneThought,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	removeReaction
} = require('../../controllers/thoughtController');
