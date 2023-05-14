const { Schema, model } = require('mongoose');
const moment = require('moment');
// creating a new schema for user thoughts
const thoughtSchema = new Schema({
  //creating properties for thought posts
  thoughtText: {
		type: String,
		required: true,
    minlength: 1,
    maxLength: 280
	},
  // creating properties for date and time of thought post
  createdAt: {
		type: Date,
		default: Date.now,
		required: true,
		get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  // referencing User model to pass in the user name
  username: {
    type: String,
    ref: 'user',
    required: true,
    unique: true,
  },
  // creating a virtual property to get reaction count of a thought
  reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'reaction',
  }],  toJSON: {
    virtual: true,
    getters: true,   },
  id: false,
});

thoughtSchema.virtual('reactionCount');

const Thought = model('thought', thoughtSchema);


module.exports =  Thought;
