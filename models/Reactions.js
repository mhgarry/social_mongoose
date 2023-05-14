//making a reaction schema
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
	{
		// make id for reaction
		reactionId: {
			type: String,
			default: () => new Types.ObjectId
		},

			//body of reaction ]
			reactionBody: {
				type: String,
				required: true,
				maxLength: 300,
		},
		//username of user who made the reaction
		username: {
			type: String,
      required: true,
			ref: 'user'
		},
		createdAt: {
			type: Date,
			default: Date.now,
			required: true,
			get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
		},
		toJson: {
			getters: true,
		},
		id: false,
	}
);

module.exports = reactionSchema;
