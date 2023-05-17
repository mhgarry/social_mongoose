const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Making a reaction schema
const reactionSchema = new Schema(
  {
    // Make id for reaction
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    // Body of reaction
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    // Username of user who made the reaction
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// Creating thought schema
const thoughtSchema = new Schema(
  {
    // Inner thought text body
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    // Date and time thought is created at
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    // Reference user schema to show who created the thought
    username: {
      type: String,
      required: true
    },
    // Create an array for reactions
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// Adding thought count virtual to thought schema
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Creating a thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
