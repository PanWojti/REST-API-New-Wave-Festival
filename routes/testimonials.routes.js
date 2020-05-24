// testimonials.routes.js

const express = require('express');
const router = express.Router();
//const db = require('./../db');
//const uuidv4 = require('uuid/v4');
const Testimonial = require('../models/testimonial.model');

// get all posts
//router.route('/testimonials').get((req, res) => {
//  return res.json(db.testimonials);
//});

// get all posts
router.get('/testimonials', async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

//returns a random element from database array
//router.route('/testimonials/random').get((req, res) => {
//  const randomElement = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
//  return res.json(randomElement);
//});

//returns a random element from database array
router.get('/testimonials/random', async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

//returns the one element of database array that matches the id
//router.route('/testimonials/:id').get((req, res) => {
//  const id = req.params.id;

//  for (let element of db.testimonials) {
//    if (element.id == id) {
//      return res.json(element);
//    }
//  }
//});

//returns the one element of database array that matches the id
router.get('/testimonials/:id', async (req, res) => {

  try {
    const tes = await Testimonial.findById(req.params.id);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

//add a new element to the database array
//router.route('/testimonials').post((req, res) => {
//  const { author, text } = req.body;

//  const newElement = { id: uuidv4(), author: author, text: text };
//  db.testimonials.push(newElement);

//  return res.json({ message: 'OK' });
//});

//add a new element to the database array
router.post('/testimonials', async (req, res) => {

  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

});

//edit array element with matching id
//router.route('/testimonials/:id').put((req, res) => {
//  const { author, text } = req.body;
//  const id = req.params.id;

//  for (let element of db.testimonials) {
//    if (element.id == id) {
//      element.author = author;
//      element.text = text;
//    }
//  }

//  return res.json({ message: 'OK' });
//});

//edit array element with matching id
router.put('/testimonials/:id', async (req, res) => {
  const { author, text } = req.body;

  try {
    const tes = await(Testimonial.findById(req.params.id));
    if(tes) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text }});
      const tesUpdated = await Testimonial.findById(req.params.id);
      await tesUpdated.save();
      res.json({ message: `Testimonial ${tes} has been updated, now is ${tesUpdated}` });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

//removes one element from database array with matching id
//router.route('/testimonials/:id').delete((req, res) => {
//  const id = req.params.id;

//  for (let element of db.testimonials) {
//    if (element.id == id) {
//      db.testimonials.splice(db.testimonials.indexOf(element),1);
//    }
//  }

//  return res.json({ message: 'OK' });
//});

//removes one element from database array with matching id
router.delete('/testimonials/:id', async (req, res) => {

  try {
    const tes = await(Testimonial.findById(req.params.id));
    if(tes) {
      await Testimonial.deleteOne({ _id: req.params.id});
      res.json({ message: `Testimonial ${tes} has been deleted` });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

module.exports = router;
