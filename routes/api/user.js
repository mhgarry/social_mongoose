const router = require('express').Router();
// bring in our user controllers from the controllers folder
const {
	getAllUsers,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	removeFriend,
} = require('../../controllers/userController')
