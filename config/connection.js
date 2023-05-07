require('dotenv').config(); // load.env file
const mongoose = require('mongoose'); // import mongoose orm library


mongoose.set('strictQuery', false); // turn off strict query mode since mongoose will give errors
mongoose.connection.setMaxListeners(Infinity); // set's the max amount of listeners to as many as possible so mongoose wont throw errors
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
  useUnifiedTopology: true,
}); // connect to the database

mongoose.connection.on('connected', () => {
	console.log('Mongoose default connection open to'+ process.env.MONGODB_URI);
}); // when the connect is open to the database log the connection

mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error:'+ err);
}); // when there is an error log the error

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});  // when the connection is disconnected log the connection

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  }); // close the connection when app termination
});

module.exports = mongoose; // export the mongoose library, specifically the connection
