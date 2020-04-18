// seats.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');

// get all posts
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

//returns the one element of database array that matches the id
router.route('/seats/:id').get((req, res) => {
  const id = req.params.id;

  for (let element of db.seats) {
    if (element.id == id) {
      res.json(element);
    }
  }
});

//add a new element to the database array
router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  const newElement = { id: uuidv4(), day: day, seat: seat, client: client, email: email };
  db.seats.push(newElement);

  res.json({ message: 'OK' });
});

//edit array element with matching id
router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = req.params.id;

  for (let element of db.seats) {
    if (element.id == id) {
      element.day = day;
      element.seat = seat;
      element.client = client;
      element.email = email;
    }
  }

  res.json({ message: 'OK' });
});

//removes one element from database array with matching id
router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id;

  for (let element of db.seats) {
    if (element.id == id) {
      db.seats.splice(db.seats.indexOf(element),1);
    }
  }

  res.json({ message: 'OK' });
});

/* ... */

module.exports = router;
