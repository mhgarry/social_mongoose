const { User } = require("../models");

const userController = {
  // get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get one user by _id
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate([
        {
          path: 'thoughts',
          populate: { path: 'reactions' },
        },
        { path: 'friends' },
      ]);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = userController;
