// seats.routes.js

const express = require('express');
const router = express.Router();
const Seat = require('../models/seat.model');

// get all posts
//router.route('/seats').get((req, res) => {
//  return res.json(db.seats);
//});

// get all posts
router.get('/seats', async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

//returns the one element of database array that matches the id
//router.route('/seats/:id').get((req, res) => {
//  const id = req.params.id;

//  for (let element of db.seats) {
//    if (element.id == id) {
//      return res.json(element);
//    }
//  }
//});

//returns the one element of database array that matches the id
router.get('/seats/:id', async (req, res) => {

  try {
    const sea = await Seat.findById(req.params.id);
    if(!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

//add a new element to the database array
//router.route('/seats').post((req, res) => {
//  const { day, seat, client, email } = req.body;
//  const availability = true;

//  for (let element of db.seats) {
//    if (element.day === day && element.seat === seat) {
//      return res.status(403).json({ message: 'This seat is already taken...' });;
//      availability = false;
//    }
//  }
//  if (availability === true) {
//  const newElement = {
//    id: uuidv4(),
//    day: day,
//    seat: seat,
//    client: client,
//    email: email
//  };
//  db.seats.push(newElement);
//  return res.json({ message: 'OK' });
//  req.io.emit('seatsUpdated', db.seats);
//}
//});

//add a new element to the database array
router.post('/seats', async (req, res) => {

  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
    await newSeat.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

});

//edit array element with matching id
//router.route('/seats/:id').put((req, res) => {
//  const { day, seat, client, email } = req.body;
//  const id = req.params.id;

//  for (let element of db.seats) {
//    if (element.id == id) {
//      element.day = day;
//      element.seat = seat;
//      element.client = client;
//      element.email = email;
//    }
//  }

//  return res.json({ message: 'OK' });
//});

//edit array element with matching id
router.put('/seats/:id', async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const sea = await(Seat.findById(req.params.id));
    if(sea) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
      const seaUpdated = await Seat.findById(req.params.id);
      await seaUpdated.save();
      res.json({ message: `Seat ${sea} has been updated, now is ${seaUpdated}` });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

//removes one element from database array with matching id
//router.route('/seats/:id').delete((req, res) => {
//  const id = req.params.id;

//  for (let element of db.seats) {
//    if (element.id == id) {
//      db.seats.splice(db.seats.indexOf(element),1);
//    }
//  }
//  return res.json({ message: 'OK' });
//});

//removes one element from database array with matching id
router.delete('/seats/:id', async (req, res) => {
  try {
    const sea = await(Seat.findById(req.params.id));
    if(sea) {
      await Seat.deleteOne({ _id: req.params.id});
      res.json({ message: `Seat ${sea} has been deleted` });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
