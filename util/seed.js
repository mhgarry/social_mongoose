const connection = require('../config/connection'); // import connection file
const { User, Thought } = require('../models');// import models file
const moment = require('moment');
const seedData = [
	{
		userName: 'jinx',
		email: 'jinx@jinx.com',
		thoughts:[
			{
				thoughtText: 'Have a good day',
				createdAt: moment().subtract(7, 'days').toDate (),
				reactions: [
					{
						reactionBody: 'like',
						username: 'mangos',
						createdAt: moment().subtract(4, 'days').toDate (),
					},
				],
			},
		],
		friends:[],
	},
	{
		userName: 'mangos',
		email: 'mangos@mangos.com',
		thoughts:[
			{
				thoughtText: 'I like mangos',
				createdAt: moment().subtract(3, 'days').toDate (),
				reactions: [
					{
						reactionBody: ':/',
						username: 'hello',
						createdAt: moment().subtract(1, 'days').toDate (),
					},
				],
			},
		],
		friends:[],
	},
	{
		userName: 'hello',
		email: 'hello@hello.com',
		thoughts:[
			{
				thoughtText: 'hello',
				createdAt: moment().subtract(1, 'hour').toDate (),
				reactions: [
					{
						reactionBody: 'hello',
						username: 'mango',
						createdAt: moment().subtract(20, 'minutes').toDate (),
					},
				],
			},
		],
		friends:[],
	},
]

async function seedDatabase() {
  try {
    // Clear existing data from collections
    await User.deleteMany();
    await Thought.deleteMany();
    await Reaction.deleteMany();

    // Seed users
    const users = await User.create(seedData);

    // Seed thoughts and reactions
    const thoughtsAndReactions = seedData.flatMap(user => {
      return user.thoughts.map(thought => {
        thought.username = users.find(u => u.username === user.username)._id;
        thought.reactions = thought.reactions.map(reaction => {
          reaction.username = users.find(u => u.username === reaction.username)._id;
          return reaction;
        });
        return thought;
      });
    });

    await Thought.create(thoughtsAndReactions);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
