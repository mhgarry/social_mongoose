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
router.route('/users').get(getAllUsers);
// create user route
router.route('/users').post(createUser)
// get single user routes
router.route('/users:id').get(getSingleUser);
// update a user
router.route('/users:id').put(updateUser);
// delete a user
router.route('/users:id').delete(deleteUser);
// get friends
router.route('/users:userId/friends').post(addFriend);
// remove friend
router.route('/user:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
