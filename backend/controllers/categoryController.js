const fs = require('fs');
const Category = require('../models/categoryModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');
const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCategoryImage = upload.single('imageCover');

exports.resizeCategoryImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.imageCover = `category-${req.params.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`frontend/public/static/images/categories/${req.body.imageCover}`);

  next();
});

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
