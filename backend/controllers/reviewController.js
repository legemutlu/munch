const fs = require('fs');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('../controllers/handlerFactory');

// Review Routes
exports.aliasTopReviews = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'rating';
  req.query.fields = '';
  next();
};

exports.setFoodUserID = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.food) req.body.food = req.params.foodId;
  next();
};

exports.checkUserIsOwner = async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (
    JSON.stringify(review.user._id) === JSON.stringify(req.user._id) ||
    req.user.role === 'admin'
  ) {
    next();
  } else {
    return next(new AppError('You are not owner!', 400));
  }
};

exports.getAllReviews = factory.getAll(Review);
exports.getReviewById = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id });
  res.status(200).json({
    status: 'success',
    data: {
      reviews,
    },
  });
});

// This part will reorganize for review
TODO: exports.getOrderStats = catchAsync(async (req, res, next) => {
  const stats = await Order.aggregate([
    {
      $unwind: '$foods',
    },
    {
      $group: {
        _id: { category: { $toUpper: '$foods.category' } },
        numOrders: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
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
  const plan = await Order.aggregate([
    {
      $unwind: '$createdAt',
    },
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        numOrderStarts: { $sum: 1 },
        orders: { $push: { orderID: '$_id', orderedFoods: '$foods.name' } },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { numOrderStarts: -1 },
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
  const orders = JSON.parse(fs.readFileSync(`data/ordersData.json`, 'utf-8'));
  await Order.create(orders);
  res.status(200).json({
    status: 'success',
    message: 'Datas loaded',
    data: orders,
  });
});

exports.deleteAllData = catchAsync(async (req, res, next) => {
  await Review.deleteMany();
  res.status(204).json({
    status: 'success',
    message: 'All Data deleted',
  });
});
