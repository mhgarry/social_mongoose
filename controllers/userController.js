const { User, Thought } = require('../models');
// a User controller responsible for interacting with the User model in our db
const UserController = {
	// gets all users in db
	async getAllUsers(req, res) {
		try {
			// find all users in db
		const users = await User.findAll();
		// return all users in db in json format
		res.status(200).json(users);
		// if error show user not found message
	} catch (err) {
		res.status(500).json(err);
	};
},
	// gets a user by id
	async getUserById(req, res) {
		try {
			// finds a User from the user model in our db by id
			const user = await User.findById(req.params.userId);
			// return the user data in json format
			res.status(200).User(user);
			// if error show user not found message
		} catch (err) {
			res.status(500).json(err);
		};
	},
	// creates a new user
	async createUser (req, res) {
		// creates a new user in our db
		try {
			const user = await User.create(req.body);
			// return the user data in json format
			res.status(201).json(user);
			// if error show user not created message
    } catch (err) {
      res.status(500).json(err);
		};
	},
	async updateUser (req, res) {
		// updates a user in our db
		try {
			// finds a User from the user model in our db by id
			const user = await User.findById(req.params.userId);
			// updates a user in our db using the body of the request
			await user.update(req.body);
			// return the updated user data in json format
			res.status(200).json(user);
			// if error show user not updated message
			} catch (err) {
        res.status(500).json(err);
		};
	},
	// delete a user by id along with all associated thoughts
	async deleteUser (req, res) {
		try {
			// finds a User from the user model in our db by id
			const user = await User.findById(req.params.userId);
			// deletes a user from our db using the body of the request
			await user.destroy();
			// deletes all associated thoughts using the userId to find all associate thoughts and destroyMany deletes them
			await Thought.destroyMany({
				where: {
					userId: req.params.UserId
				}
			});
			// return the deleted user data in json format
			res.status(200).json(user);
			} catch (err) {
        res.status(500).json(err);
		};
	},
	async addFriend(req, res) {
		try {
			// finds a user from the user model and updates their friends list
			const user = await User.findByIdAndUpdate(
				req.body.userId,
				{ $push: { friends: req.body.friend._id}},
				{ new: true },
			);
			// return the updated user data and friends list in json format
			res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
		};
	},
	//delete a friend by id
	async deleteFriends(req, res) {
		try {
			// finds a user from the user model and deletes the specified friend from their friends list
			const user = await User.findByIdAndUpdate(
				req.params.userId,
        { $pull: { friends: req.params.friendId}},
        { new: true },
			);

			// return the update user data and friends list in json format
			res.status(200).json(user);
						} catch (err) {
							res.status(500).json(err);
		};
	}};
// export the userController to be routed in our database and server
module.exports = UserController;


