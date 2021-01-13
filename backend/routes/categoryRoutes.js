const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();

const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  loadAllData,
  deleteAllData,
  aliasTopCategories,
} = categoryController;

router.route('/priv').post(loadAllData).delete(deleteAllData);
router.route('/top-5-cheap').get(aliasTopCategories, getAllCategories);

// Categorys Routes
router.route('/').get(getAllCategories).post(createCategory);
router
  .route('/:id')
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
