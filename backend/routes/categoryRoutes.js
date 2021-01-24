const express = require('express');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

const { protect, restrictTo } = authController;

const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  loadAllData,
  deleteAllData,
  uploadCategoryImage,
  resizeCategoryImage,
  aliasTopCategories,
} = categoryController;

router.route('/priv').post(loadAllData).delete(deleteAllData);
router.route('/top-5-cheap').get(aliasTopCategories, getAllCategories);

// Categorys Routes
router
  .route('/')
  .get(getAllCategories)
  .post(protect, restrictTo('admin'), createCategory);
router
  .route('/:id')
  .get(getCategoryById)
  .patch(
    protect,
    restrictTo('admin'),
    uploadCategoryImage,
    resizeCategoryImage,
    updateCategory
  )
  .delete(protect, restrictTo('admin'), deleteCategory);

module.exports = router;
