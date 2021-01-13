const express = require('express');
const authContorller = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const router = express.Router();

const { protect, restrictTo } = authContorller;

const {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  setUserID,
  loadAllData,
  deleteAllData,
  aliasTopOrders,
  getOrderStats,
  getOrderStatsByUser,
  getMonthlyPlan,
  getMyOrders,
  checkUserIsOwner,
  checkStatus,
} = orderController;

router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/priv').post(loadAllData).delete(deleteAllData);
router.route('/top-5-cheap').get(aliasTopOrders, getAllOrders);
router.route('/order-stats').get(getOrderStats);
router.route('/order-stats-user').get(getOrderStatsByUser);
router.route('/my-orders').get(protect, getMyOrders);

// Orders Routes
router
  .route('/')
  .get(protect, restrictTo('admin'), getAllOrders)
  .post(protect, setUserID, createOrder);
router
  .route('/:id')
  .get(protect, checkUserIsOwner, getOrderById)
  .patch(protect, restrictTo('admin', 'employee'), updateOrder)
  .delete(protect, restrictTo('admin', 'employee'), checkStatus, deleteOrder);

module.exports = router;
