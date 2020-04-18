const express = require('express');
const path = require('path');
const cors = require('cors');
const uuidv4 = require('uuid/v4');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//returns all records from database
app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

//returns a random element from database array
app.get('/testimonials/random', (req, res) => {
  const randomElement = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(randomElement);
});

//returns the one element of database array that matches the id
app.get('/testimonials/:id', (req, res) => {
  const id = req.params.id;

  for (let element of db.testimonials) {
    if (element.id == id) {
      res.json(element);
    }
  }
});

//add a new element to the database array
app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  const newElement = { id: uuidv4(), author: author, text: text };
  db.testimonials.push(newElement);

  res.json({ message: 'OK' });
});

//edit array element with matching id
app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;

  for (let element of db.testimonials) {
    if (element.id == id) {
      element.author = author;
      element.text = text;
    }
  }

  res.json({ message: 'OK' });
});

//removes one element from database array with matching id
app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;

  for (let element of db.testimonials) {
    if (element.id == id) {
      db.testimonials.splice(db.testimonials.indexOf(element),1);
    }
  }

  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
