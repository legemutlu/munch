const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'A reservation must have a date'],
  },
  phone: {
    type: Number,
    required: [true, 'A reservation must have a phone number'],
  },
  name:{
    type: String,
    required: [true, 'A reservation must have a name'],
  },
  note:{
    type: String
  }
});

const Reservation = mongoose.model('reservation', reservationSchema);

module.exports = Reservation;
