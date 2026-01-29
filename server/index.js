// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const app = express();
// app.use(express.json());
// const port = 8001;
// const users = require('./sample.json');

// app.use(cors());

// //Display All Users
// app.get('/users', (req, res) => {
//   res.json(users);
// });

// app.get('/', (req, res) => {
//   res.send('Backend is running successfully');
// });

// app.get('/api/test', (req, res) => {
//   res.json({ message: 'API connected' });
// });

// //Delect User Details
// app.delete('/users/:id', (req, res) => {
//   let id = Number(req.params.id);
//   let filteredUsers = users.filter((users) => users.id !== id);
//   fs.writeFile('./sample.json', JSON.stringify(filteredUsers), (err) => {
//     if (err) return res.status(500).json({ message: 'Failed to save data' });
//     return res.json(filteredUsers);
//   });
// });

// //Add new user
// app.post('/users', (req, res) => {
//   let { name, age, city } = req.body;
//   if (!name || !age || !city) {
//     res.status(400).send({ message: 'All fields Required and full it must' });
//   }
//   const id = Date.now();
//   users.push({ id, name, age, city });

//   fs.writeFile('./sample.json', JSON.stringify(users), (err) => {
//     if (err) return res.status(500).json({ message: 'Failed to save data' });
//     return res.json({ message: 'User detail added successfully' });
//   });
// });

// //Update User
// app.patch('/users/:id', (req, res) => {
//   let id = Number(req.params.id);
//   let { name, age, city } = req.body;
//   if (!name || !age || !city) {
//     return res.status(400).send({ message: 'All fields Required for Update your Datas' });
//   }
//   let index = users.findIndex((user) => user.id == id);

//   users.splice(index, 1, { ...req.body });

//   fs.writeFile('./sample.json', JSON.stringify(users), (err) => {
//     if (err) return res.status(500).json({ message: 'Failed to update data' });
//     return res.json({ message: 'User detail updated successfully and saved' });
//   });
// });

// app.listen(port, '0.0.0.0', () => {
//   console.log(`App is running on port ${port}`);
// });

const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 8001;
const users = require('./sample.json');

app.use(cors());
app.use(express.json());

// Display All Users
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/', (req, res) => {
  res.send('Backend is running successfully');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API connected' });
});

// Delete User
app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const filteredUsers = users.filter((user) => user.id !== id);

  fs.writeFile('./sample.json', JSON.stringify(filteredUsers), (err) => {
    if (err) return res.status(500).json({ message: 'Failed to save data' });
    return res.json(filteredUsers);
  });
});

// Add User
app.post('/users', (req, res) => {
  const { name, age, city } = req.body;

  if (!name || !age || !city) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const id = Date.now();
  users.push({ id, name, age, city });

  fs.writeFile('./sample.json', JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ message: 'Failed to save data' });
    return res.json({ message: 'User added successfully' });
  });
});

// Update User
app.patch('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, age, city } = req.body;

  if (!name || !age || !city) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[index] = { id, name, age, city };

  fs.writeFile('./sample.json', JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ message: 'Failed to update data' });
    return res.json({ message: 'User updated successfully' });
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}`);
});
