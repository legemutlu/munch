const fs = require('fs');
const Category = require('../models/categoryModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');

exports.aliasTopCategories = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,title';
  req.query.fields = 'title,price';
  next();
};

// Category Routes
exports.getAllCategories = factory.getAll(Category);
exports.getCategoryById = factory.getOne(Category);
exports.createCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);

// Do not use!
exports.loadAllData = catchAsync(async (req, res, next) => {
  const categories = JSON.parse(
    fs.readFileSync(`data/categoriesData.json`, 'utf-8')
  );
  await Category.create(categories);
  res.status(200).json({
    status: 'success',
    message: 'Datas loaded',
    data: categories,
  });
});

exports.deleteAllData = catchAsync(async (req, res, next) => {
  await Category.deleteMany();
  res.status(204).json({
    status: 'success',
    message: 'All Data deleted',
  });
});
