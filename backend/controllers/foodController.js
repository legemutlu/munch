const fs = require('fs');
const Food = require('../models/foodModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');
const AppError = require('../utils/appError');
const Category = require('../models/categoryModel');

exports.aliasTopFoods = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage';
  next();
};

// Food Routes
exports.getAllFoods = factory.getAll(Food);
exports.getFoodById = factory.getOne(Food, { path: 'reviews' });
exports.updateFood = factory.updateOne(Food);

exports.createFood = catchAsync(async (req, res, next) => {
    const doc = await Food.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

exports.deleteFood = catchAsync(async (req, res, next) => {

  const category = await Category.find()
  if(category){
    for (let i = 0; i < category.length; i++) {
      let getCategory = category[i];
      if(getCategory.foods.length > 0){
        for (let j = 0; j < getCategory.foods.length; j++) {
          if(getCategory.foods[j].toString() === req.params.id){
            await Category.findByIdAndUpdate( { _id: getCategory._id  }, { $pull: { foods: getCategory.foods[j]  } } )
          }
        }
      }
    }
  }

  const food = await Food.findByIdAndDelete(req.params.id);
  if (!food) {
    return next(new AppError('No document found with that ID', 404));
  }


  res.status(204).json({
    status: 'success',
    data: null,
  });

})


exports.getFoodStats = catchAsync(async (req, res, next) => {
  const stats = await Food.aggregate([
    {
      $group: {
        _id: { category: '$category' },
        numFoods: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRatings: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Food.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numFoodStarts: { $sum: 1 },
        foods: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { numFoodStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);
  res.status(200).json({
    status: 'success',
    result: plan.length,
    data: {
      plan,
    },
  });
});

// Do not use!
exports.loadAllData = catchAsync(async (req, res, next) => {
  const foods = JSON.parse(fs.readFileSync('data/foodData.json', 'utf-8'));

  await Food.create(foods);
  res.status(200).json({
    status: 'success',
    message: 'Datas loaded',
    data: foods,
  });
});

exports.deleteAllData = catchAsync(async (req, res, next) => {
  await Food.deleteMany();
  res.status(204).json({
    status: 'success',
    message: 'All Data deleted',
  });
});
