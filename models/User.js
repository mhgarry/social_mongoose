const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
	// making user schema

		//making username field in our user schema
	username : {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	// creating an email field in our user schema
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, 'Must match a valid email address!'],
	},
	// creating a thoughts array field in our user schema
	thoughts:
	[
		{
			type: Schema.Types.ObjectId,
      ref: 'thought',
		},
	],
	// creating a friends array field in our user schema
	friends: [
		{
			type: Schema.Types.ObjectId,
      ref: 'user',
		},
	],
},
{
	toJSON: {
		virtuals: true,
	}
});
// adding virtuals to the user schema
userSchema.virtual('thoughtCount').get(function () {
	return this.thoughts.length;
});

userSchema.virtual('friendCount').get(function ()
{
	return this.friends.length;
});
// creating the user model
const User = model('user', userSchema);

module.exports = User;
