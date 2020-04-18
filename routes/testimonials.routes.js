// testimonials.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');

// get all posts
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

//returns a random element from database array
router.route('/testimonials/random').get((req, res) => {
  const randomElement = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(randomElement);
});

//returns the one element of database array that matches the id
router.route('/testimonials/:id').get((req, res) => {
  const id = req.params.id;

  for (let element of db.testimonials) {
    if (element.id == id) {
      res.json(element);
    }
  }
});

//add a new element to the database array
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  const newElement = { id: uuidv4(), author: author, text: text };
  db.testimonials.push(newElement);

  res.json({ message: 'OK' });
});

//edit array element with matching id
router.route('/testimonials/:id').put((req, res) => {
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
router.route('/testimonials/:id').delete((req, res) => {
  const id = req.params.id;

  for (let element of db.testimonials) {
    if (element.id == id) {
      db.testimonials.splice(db.testimonials.indexOf(element),1);
    }
  }

  res.json({ message: 'OK' });
});

/* ... */

module.exports = router;
