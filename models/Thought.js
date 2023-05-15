const { Schema, model } = require('mongoose');
const moment = require('moment');
// creating thought schema
const thoughtSchema = new Schema(
	{
		// inner thought text body
		thoughtText: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 280
		},
		// date and time thought is created at
		createdAt: {
			type: Date,
			default: Date.now,
			get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
		},
		// reference user schema to show who created the thought
		username: {
			type: String,
			ref: 'user',
			required: true,
			unique: true,
		},
		// create an array for reactions
		reactions: [
			{
			type: Schema.Types.ObjectId,
			ref: 'reaction',
		}
		]
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
	});
// adding thought count virtual to thought schema
thoughtSchema.virtual('reactionCount').get(function  () {
	return this.reactions.length;
});
// creating a thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
