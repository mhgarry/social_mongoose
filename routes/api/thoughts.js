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
router.route('/thoughts').get(getThoughts);
router.post('/thoughts', createThought);
// get one thought
router.route('/thoughts/:id').get(getOneThought);
// update thought
router.route('/thoughts/:id').put(updateThought);
// delete thought
router.route('/thoughts/:id').delete(deleteThought);
// add reaction
router.route('/thoughts/:id/reactions').post(addReaction);
// remove reaction
router.route('/thoughts/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
