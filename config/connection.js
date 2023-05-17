const { connect, connection } = require('mongoose');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectionString = process.env.MONGODB_URI; // string to connect to the database

connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}); // connect to the database

module.exports = connection; //export connection to be used in other files
