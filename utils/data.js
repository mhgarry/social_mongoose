const usersNames = [
	'Mango',
	'Jinx',
	'Dose',
	'Vaporwave',
	'meme',
	'lemon'
];

const thoughtBody = [
	'I love social networking!',
	'I ate lunch',
	'I need gray pants',
	'That was close',
	'Sleep zzzzzz',
	'Hey! Listen!'
];

const users = [];

// get random array item
const getRandomItem = (arr) =>
arr[Math.floor(Math.random() *
	arr.length)];

// get random username
const getRandomUserName = () =>
	`${getRandomItem(usersNames)}`

// get random thought body
const getRandomThought = () =>
  `${getRandomItem(thoughtBody)}`;

	module.exports = {getRandomUserName,
	getRandomThought};
