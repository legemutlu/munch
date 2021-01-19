const express = require('express');
const authController = require('../controllers/authController');
const contactController = require('../controllers/contactController');

const router = express.Router();

const { protect, restrictTo } = authController;

const {
  getAllContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} = contactController;


// Contacts Routes
router.route('/').get(getAllContacts).post(protect, restrictTo('admin'),createContact);
router
  .route('/:id')
  .get(protect, restrictTo('admin'),getContactById)
  .patch(protect, restrictTo('admin'),updateContact)
  .delete(protect, restrictTo('admin'),deleteContact);

module.exports = router;
