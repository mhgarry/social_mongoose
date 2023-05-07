const { Schema, Model } = require('mongoose');
const User = require('./User');
// creating a new Schema for the user thoughts/posts
const thoughtSchema = new Schema({
	// creating properties of the user thought posts
	thoughtText: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 280
	},
	// creating properties to get the date and time stamp for a thoughts post
	createdAt: {
		type: Date,
		date: Date.now,
		timeStamp: true,
		required: true,
		get: (createdAtVal) => dateFormat(createdAtVal)
	},
	// referencing the User model to get the username to associate with a thoughts post
	username: {
		type: String,
		required: true,
		ref: 'User'
	},
	// creating a virtual property to get the reaction count for a thoughts post
	reactions: [{
		type: Schema.Types.ObjectID,
		parent: 'Thought',
		ref: 'Reaction',
	}],
	toJson: {
		virtuals: true,
		getters: true,
	},
	id: false
});

thoughtSchema.virtual('reactionCount') // gets reaction count for thought model, have to go back later once routes are finished
// creating a new model for user Thoughts
const Thought = Model('Thought', thoughtSchema);

module.exports = Thought;
