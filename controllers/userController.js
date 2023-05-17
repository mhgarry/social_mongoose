const { User, Thought } = require('../models');

const userController = {
	// get all users
	async getAllUsers (req, res ) {
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
		res.status(500).json(err);
	}
},
// update a user
async updateUser (req, res) {
	try {
		const user = await User.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: req.body },
			{ runValidators: true, new: true }
		);
	if (!user) {
		return res.status(404).json({ message: 'No user with this id' });
	}
	res.json(user);
	} catch(err) {
		console.log(err);
		res.status(500).json(err);
	}
},

// delete a user and associated thoughts
async deleteUser (req, res) {
	try {
		const user = await User.findOneAndDelete({ _id: req.params.id });
		if (!user) {
			return res.status(404).json({ message: 'No user with this id'});
		}
	await Thought.deleteMany({ _id: { $in: user.thoughts } });
	res.json({ message: 'User and thoughts deleted'});
	} catch(err) {
		console.log(err);
		res.status(500).json(err);
	}
},
// add friend to a users friend list
async addFriend (req, res) {
	try {
		const user = await User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.params.friendId } },
			{ new: true }
		);
		if (!user) {
			return res.status(404).json( { message: 'No user with this id' } );
		}
		res.json(user);
	} catch(err) {
		console.log(err);
		res.status(500).json(err);
	}
},
// remove friend from a users friend list
async removeFriend (req, res) {
	try {
		const user = await User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{ new: true }
		);
	res.json(user);
	} catch(err) {
		console.log(err);
		res.status(500).json(err);
	}
},
};

module.exports = userController;
