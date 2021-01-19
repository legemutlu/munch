const express = require('express');
const authController = require('../controllers/authController');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

const { protect, restrictTo } = authController;

const {
  getAllReservations,
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
} = reservationController;


// Reservations Routes
router.route('/').get(protect, restrictTo('admin'),getAllReservations).post(createReservation);
router
  .route('/:id')
  .get(protect, restrictTo('admin'),getReservationById)
  .patch(protect, restrictTo('admin'),updateReservation)
  .delete(protect, restrictTo('admin'),deleteReservation);

module.exports = router;