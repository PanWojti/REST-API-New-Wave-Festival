// concerts.routes.js

const express = require('express');
const router = express.Router();
const Concert = require('../models/concert.model');

// get all posts
router.get('/concerts', async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

//returns the one element of database array that matches the id
router.get('/concerts/:id', async (req, res) => {

  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

//add a new element to the database array
router.post('/seats', async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
});

//edit array element with matching id
router.put('/seats/:id', async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const con = await(Concert.findById(req.params.id));
    if(con) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
      const conUpdated = await Concert.findById(req.params.id);
      await conUpdated.save();
      res.json({ message: `Concert ${con} has been updated, now is ${conUpdated}` });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

//removes one element from database array with matching id
router.delete('/concerts/:id', async (req, res) => {
  try {
    const con = await(Concert.findById(req.params.id));
    if(con) {
      await Concert.deleteOne({ _id: req.params.id});
      res.json({ message: `Concert ${con} has been deleted` });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
