const { Thought, User } = require('../models');

const thoughtController = {
	// gets all thoughts in the db
	async getAllThoughts (req, res) {
		try {
			// finds all thoughts
			const thoughts = await Thought.findAll()
			// returns all thoughts in db in json format
			res.status(200).json(thoughts);
			// if error occurs show thoughts not found message
			} catch (err) {
        res.status(500).json(err);
      };
		},
		// get a thought by id
		async getThoughtById (req, res) {
      try {
        // finds a thought by id
        const thought = await	Thought.findById(req.params.id)
        // returns thought in json format
        res.status(200).json(thought);
        // if error occurs show thoughts not found message
        } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a new thought with userId attached
		async createThought (req, res) {
			try {
				const thought = await Thought.create({
					thoughtContent: req.body.thoughtContent,
					userId: req.body.userId,
				});
				// find and associate user with thought
				const user = await User.findByIdAndUpdate(
					req.body.userId,
					{ $push: { thoughts: thought._id }},
          { new: true }
				);
				// returns thought in json format
				res.status(200).json({ thought, user});
			} catch (err) {
				res.status(500).json(err);

		};
	},

  async updateThought (req, res) {
    try {
      // updates a thought
    	const thought = await Thought.update(req.body, {
       where: {
        id: req.params.id
        },
      });
      // returns thought in json format
      res.status(200).json(thought);
      // if error occurs show thoughts not found message
      } catch (err) {
      res.status(500).json(err);
      };
    },
    // delete a Thought
		async deleteThought (req, res) {
      try {
        // deletes a thought
        const thought = await Thought.destroy({
          where: {
            id: req.params.id
          },
        });
        // returns thought in json format
        res.status(200).json(thought);
        // if error occurs show thoughts not found message
        } catch (err) {
        res.status(500).json(err);
      };
		},
  };
//export the thought controller to be used in our database and server
module.exports = thoughtController;
