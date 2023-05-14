const { User, Thought } = require('../models');

const userController = {
	// get all users
	async getAllUsers (req, req ) {
		try {
			const user = await User.find().select('-__v');
			res.json(user);
		} catch(err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
	// get one user by id
	async getSingleUser (req, res) {
		try {
			const user = await User.findOne({ _id: req.params.id }).select('-__v').
			populate('friends').
			populate('thoughts');
		if (!user) {
			return res.status(404).json({ message: 'No user with this id' });
		}
		res.json(user);
		} catch(err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
// create a user
async createUser (req, res) {
	try {
		const user = await User.create(req.body);
		res.json(user);
	} catch(err) {
		console.log(err);
		res.status(500).json(err)p;
	}
}
}
