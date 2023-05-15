const mongoose = require('mongoose');
const User = require('../models/User');
const Thoughts = require('../models/Thought');
const { connection } = require('../config/connection'); // import connection file
// seed the database
const seedDatabase = async () => {
	try {
		//clear database
		await User.deleteMany();
		await Thoughts.deleteMany();

		// create mock users
		const user1 = await User.create({
			username: 'thisUser',
			email: 'user@example.com',
		});
	const user2 = await User.create({
		username: 'thisUser2',
		email: 'user2@example.com',
	});
	const user3 = await User.create({
		username: 'thisUser3',
		email: 'user3@example.com',
	});
const user4 = await User.create({
	username: 'thatUser4',
	email: 'user4@example.com',
});
const user5 = await User.create({
	username: 'thisUser5',
	email: 'user5@example.com',
});
const user6 = await User.create({
username: 'thatUser6',
email: 'user6@example.com',
});
// create mock thoughts
const thought1 = await Thoughts.create({
	thoughtText: 'this is a thought',
	username: user1.username,
});
const thought2 = await Thoughts.create({
	thoughtText: 'this is a thought',
	username: user2.username,
});
const thought3 = await Thoughts.create({
	thoughtText: 'this is a thought',
	username: user3.username,
});
const thought4 = await Thoughts.create({
	thoughtText: 'this is a thought',
	username: user4.username,
});
const thought5 = await Thoughts.create({
	thoughtText: 'this is a thought',
	username: user5.username,
});
const thought6 = await Thoughts.create({
	thoughtText: 'this is a thought',
	username: user6.username,
});
// associate thoughts with users
user1.thoughts.push(thought1);
user2.thoughts.push(thought2);
user3.thoughts.push(thought3);
user4.thoughts.push(thought4);
user5.thoughts.push(thought5);
user6.thoughts.push(thought6);
// save updated user data
await user1.save();
await user2.save();
await user3.save();
await user4.save();
await user5.save();
await user6.save();

console.log('Database seeded!');
	} catch (err) {
		console.error(err.message);
    process.exit(1);
	}
};

console.log('Seeding database...');
seedDatabase();
