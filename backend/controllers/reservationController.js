const factory = require('./handlerFactory');
const Reservation = require('../models/reservationModel');


exports.getAllReservations = factory.getAll(Reservation);
exports.getReservationById = factory.getOne(Reservation);
exports.createReservation = factory.createOne(Reservation);
exports.updateReservation = factory.updateOne(Reservation);
exports.deleteReservation = factory.deleteOne(Reservation);