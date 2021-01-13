const express = require('express');
const userController = require('../controllers/userController');
const authContorller = require('../controllers/authController');

const router = express.Router();

const {
  protect,
  restrictTo,
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = authContorller;

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = userController;

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', protect, updatePassword);

// User Routes
router.get('/me', protect, getMe, getUserById);
router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

// User Routes
router
  .route('/:id')
  .get(protect, restrictTo('admin'), getUserById)
  .patch(protect, restrictTo('admin'), updateUser)
  .delete(protect, restrictTo('admin'), deleteUser);
router.route('/').get(protect, restrictTo('admin'), getAllUsers);

module.exports = router;
