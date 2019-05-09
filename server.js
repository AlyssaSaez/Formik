const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
let nextId = 7;

function getNewId() {
  return nextId++;
}

let friends = [
  {
    id: 1,
    name: 'Brad',
    age: 23,
    email: 'brad@lambdaschool.com'
  },
  {
    id: 2,
    name: 'Jonathan',
    age: 28,
    email: 'jonathan@lambdaschool.com'
  },
  {
    id: 3,
    name: 'David',
    age: 28,
    email: 'david@lambdaschool.com'
  },
  {
    id: 4,
    name: 'Manju',
    age: 28,
    email: 'manju@lambdaschool.com'
  },
  {
    id: 5,
    name: 'Chase',
    age: 28,
    email: 'chase@gmail.com'
  },
  {
    id: 6,
    name: 'Todd',
    age: 28,
    email: 'todd@lambdaschool.com'
  },
];

app.use(cors());
app.use(bodyParser.json());

app.get('/friends', (req, res) => {
  res.status(200).json(friends);
});

app.post('/friends', (req, res) => {
  const friend = { id: getNewId(), ...req.body };
  friends = [...friends, friend];
  res.status(201).json(friends);
});

app.put('/friends/:id', (req, res) => {
  const { id } = req.params;
  let friendIndex = friends.findIndex(friend => friend.id == id);

  if (friendIndex >= 0) {
    friends[friendIndex] = { ...friends[friendIndex], ...req.body };
    res.status(200).json(friends);
  } else {
    res
      .status(404)
      .json({ message: `The friend with id ${id} does not exist.` });
  }
});

app.delete('/friends/:id', (req, res) => {
	friends = friends.filter(friend => friend.id != req.params.id);
	res.status(200).json(friends);
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
