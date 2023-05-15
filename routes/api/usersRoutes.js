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

// get all users route
router.route('/').get(getAllUsers);
// create user route
router.route('/').post(createUser)
// get single user routes
router.route('/:id').get(getSingleUser);
// update a user
router.route('/:id').put(updateUser);
// delete a user
router.route('/:id').delete(deleteUser);
// get friends
router.route('/:userId/friends').post(addFriend);
// remove friend
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
