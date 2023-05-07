const router = require("express").Router();
const {
	getAllUsers,
	getUserById,
	createUser,
  updateUser,
  deleteUser,
	addFriend,
  deleteFriend
} = require('../../controllers/userController')

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:id/friends/:friendId', addFriend);
router.delete('/:id/friends/:friendId', deleteFriend);

module.exports = router;
