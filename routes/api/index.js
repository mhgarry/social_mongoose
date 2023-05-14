const router = require('express').Router();
const { getAllUsers } = require('../../controllers/userController');
const { getAllThoughts } = require('../../controllers/thoughtController');

router.get('/users', getAllUsers);
router.get('/thoughts', getAllThoughts);

module.exports = router;
