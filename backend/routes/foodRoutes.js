const express = require('express');
const authController = require('../controllers/authController');
const foodController = require('../controllers/foodController');
const reviewRouter = require('./reviewRoutes');
const router = express.Router();

const { protect, restrictTo } = authController;

const {
  getAllFoods,
  createFood,
  getFoodById,
  updateFood,
  deleteFood,
  loadAllData,
  deleteAllData,
  aliasTopFoods,
  getFoodStats,
  getMonthlyPlan,
} = foodController;

router.use('/:foodId/reviews', reviewRouter);

router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/priv').post(loadAllData).delete(deleteAllData);
router.route('/top-5-cheap').get(aliasTopFoods, getAllFoods);
router.route('/food-stats').get(getFoodStats);

// Foods Routes
router
  .route('/')
  .get(getAllFoods)
  .post(protect, restrictTo('admin'), createFood);
router
  .route('/:id')
  .get(getFoodById)
  .patch(protect, restrictTo('admin'), updateFood)
  .delete(protect, restrictTo('admin'), deleteFood);

module.exports = router;
