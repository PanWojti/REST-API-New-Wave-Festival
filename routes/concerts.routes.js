// concerts.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');

// get all posts
router.route('/concerts').get((req, res) => {
  return res.json(db.concerts);
});

//returns the one element of database array that matches the id
router.route('/concerts/:id').get((req, res) => {
  const id = req.params.id;

  for (let element of db.concerts) {
    if (element.id == id) {
      return res.json(element);
    }
  }
});

//add a new element to the database array
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  const newElement = { id: uuidv4(), performer: performer, genre: genre, price: price, day: day, image: image };
  db.concerts.push(newElement);

  return res.json({ message: 'OK' });
});

//edit array element with matching id
router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = req.params.id;

  for (let element of db.concerts) {
    if (element.id == id) {
      element.performer = performer;
      element.genre = genre;
      element.price = price;
      element.day = day;
      element.image = image;
    }
  }

  return res.json({ message: 'OK' });
});

//removes one element from database array with matching id
router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;

  for (let element of db.concerts) {
    if (element.id == id) {
      db.concerts.splice(db.concerts.indexOf(element),1);
    }
  }

  return res.json({ message: 'OK' });
});

/* ... */

module.exports = router;
