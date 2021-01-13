const express = require('express');
const authContorller = require('../controllers/authController');
const inventoryController = require('../controllers/inventoryController');
const router = express.Router();

const { protect, restrictTo } = authContorller;

const {
  getAllInventories,
  createInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
  loadAllData,
  deleteAllData,
  aliasTopInventories,
  getInventoryStats,
  getMonthlyPlan,
} = inventoryController;

router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/priv').post(loadAllData).delete(deleteAllData);
router.route('/top-5-cheap').get(aliasTopInventories, getAllInventories);
router.route('/inventory-stats').get(getInventoryStats);

// Categorys Routes
router
  .route('/')
  .get(protect, restrictTo('admin', 'employee'), getAllInventories)
  .post(protect, restrictTo('admin'), createInventory);
router
  .route('/:id')
  .get(protect, restrictTo('admin', 'employee'), getInventoryById)
  .patch(protect, restrictTo('admin'), updateInventory)
  .delete(protect, restrictTo('admin'), deleteInventory);

module.exports = router;
