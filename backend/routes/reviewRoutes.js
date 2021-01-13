const express = require('express');
const authContorller = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

const { protect, restrictTo } = authContorller;

const {
  getAllReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  setFoodUserID,
  /* getReviewStats,*/
  aliasTopReviews,
  getMyReviews,
  deleteAllData,
  checkUserIsOwner,
} = reviewController;

router.route('/priv').delete(deleteAllData);
/* router.route('/order-stats').get(getOrderStats); */
router.route('/top-5-cheap').get(aliasTopReviews, getAllReviews);
router.route('/my-reviews').get(protect, getMyReviews);

// Orders Routes
router
  .route('/')
  .get(protect, getAllReviews)
  .post(protect, restrictTo('customer'), setFoodUserID, createReview);
router
  .route('/:id')
  .get(protect, getReviewById)
  .patch(protect, checkUserIsOwner, restrictTo('customer'), updateReview)
  .delete(
    protect,
    checkUserIsOwner,
    restrictTo('customer', 'admin'),
    deleteReview
  );

module.exports = router;
