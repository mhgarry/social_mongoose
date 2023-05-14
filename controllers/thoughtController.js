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
	// get one thought
	async createThought (req, res) {
		try {
			const thought = await Thought.create(req.body);
			const user = await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $push: { thoughts: thought._id } },
        { new: true }
				);
				if (!user) {
					return res.status(404).json({ messsage: 'No user to associate with this thought'});
				}
				res.json({ message: 'Thought created!' });
		} catch (err) {
			console.log(err);;
			res.status(500).json(err);
	},
	// update a thought

}
