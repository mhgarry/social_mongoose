const { Schema , Model } = require('mongoose');

// make an instance of the schema class
const userSchema = new Schema({
	// define properties for username
	userName: {
		type: string,
		required: true,
		unique: true,
		trim: true,
	},
	// define the properties for a valid email
	email: {
		type: string,
		required: true,
		unique: true,
		match: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
		},
	// reference an array of id's inside the user's thoughts model
	thoughts: [{
		type: Schema.Types.ObjectId, ref: 'Thought'
	}],
  // reference an array of id's inside the user's friends model
	friends: [
		{
			type: Schema.Types.ObjectId, ref: 'User'
		}]
},
  {
		// sending my virtuals to json format
    toJSON: {
      virtuals: true,
    },
		id: false,
  });
// create a virtual called friendCount
userSchema.virtual('friendCount') //need to add functionality to count friends once we have routes
// create a user model using the userSchema
const User = Model('User', userSchema);
