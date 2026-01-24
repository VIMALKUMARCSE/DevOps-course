const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(express.json());
const port = 8001;
const users = require('./sample.json');

app.use(cors());

//Display All Users
app.get('/users', (req, res) => {
	res.json(users);
});

app.get('/', (req, res) => {
	res.send('Backend is running successfully');
});

app.get('/api/test', (req, res) => {
	res.json({ message: 'API connected' });
});

//Delect User Details
app.delete('/users/:id', (req, res) => {
	let id = Number(req.params.id);
	let filteredUsers = users.filter((users) => users.id !== id);
	fs.writeFile('./sample.json', JSON.stringify(filteredUsers), (err, data) => {
		return res.json(filteredUsers);
	});
});

//Add new user
app.post('/users', (req, res) => {
	let { name, age, city } = req.body;
	if (!name || !age || !city) {
		res.status(400).send({ message: 'All fields Required and full it' });
	}
	const id = Date.now();
	users.push({ id, name, age, city });

	fs.writeFile('./sample.json', JSON.stringify(users), (err, data) => {
		return res.json({ message: 'User detail added sucessfully' });
	});
});

//Update User
app.patch('/users/:id', (req, res) => {
	let id = Number(req.params.id);
	let { name, age, city } = req.body;
	if (!name || !age || !city) {
		return res.status(400).send({ message: 'All fields Required' });
	}
	let index = users.findIndex((user) => user.id == id);

	users.splice(index, 1, { ...req.body });

	fs.writeFile('./sample.json', JSON.stringify(users), (err, data) => {
		return res.json({ message: 'User detail Updated sucessfully and Saved' });
	});
});

app.listen(port, '0.0.0.0', () => {
	console.log(`App is running on port ${port}`);
});
