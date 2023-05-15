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
// get all thoughts
router.route('/').get(getThoughts);
router.post('/', createThought);
// get one thought
router.route('/:id').get(getOneThought);
// update thought
router.route('/:id').put(updateThought);
// delete thought
router.route('/:id').delete(deleteThought);
// add reaction
router.route('/:id/reactions').post(addReaction);
// remove reaction
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
