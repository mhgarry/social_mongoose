const { Thought, User } = require('../models');

const thoughtController = {
	// get all thoughts
	async getThoughts (req, res) {
		try {
			const thoughts = await Thought.find().sort({ createdAt: -1 });
			res.json(thoughts);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
	// get a single thought
	async getOneThought (req, res) {
		try {
			const thought = await Thought.findOne({ _id: req.params.thoughtId });
			if (!thought) {
				return res.status(404).json({ message: 'No thought found with this id'});
			}
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
	// create a new thought
	async createThought (req, res) {
		try {
			const thought = await Thought.create(req.body);
			const user = await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $push: { thought: thought._id } },
				{ new: true }
			);
			if (!user) {
				return res.status(404).json({ message: 'No user to associate with this thought' });
			}
			res.json({ message: 'Thought created successfully', thought });
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
	// update a thought
	async updateThought (req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);
			if (!thought) {
				return res.status(404).json({ message: 'No thought found with this id'});
			}
			res.json(thought);
    } catch (err) {
			res.status(500).json(err);
		}
	},
	// delete a thought
	async deleteThought (req, res) {
		try {
			const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
			if (!thought) {
				return res.status(404).json({ message: 'No thought found with this id '});
			}
	const user = await User.findOneAndUpdate(
		{ thoughts: req.params.thoughtId },
		{ $pull: { thoughts: req.params.thoughtId }},
		{ new: true }
	);
	if (!user) {
		return res.status(404).json({ message: 'No user to associate this thought with' });
	}
	res.json({ message: 'Thought deleted!', thought });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// add thought reaction
	async addReaction (req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
			);
		if (!thought) {
			return res.status(404).json({ message: 'No thought found with this id' });
		}

      res.json(thought);
		} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
},
  // remove thought reaction
	async removeReaction (req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $pull: { reactions: { reactionId: req.params.reactionId } } },
				{ runValidators: true, new: true }
			);
		if (!thought) {
			return res.status(404).json( { message: 'No thought found with this id' } );
		}
		res.json(thought);
		} catch(err) {
			console.log(err);
		}
	},
}

module.exports = thoughtController;
