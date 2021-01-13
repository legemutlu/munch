const fs = require('fs');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('../controllers/handlerFactory');

exports.aliasTopOrders = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,title';
  req.query.fields = 'title,price';
  next();
};

exports.setUserID = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.checkUserIsOwner = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (
    JSON.stringify(order.user._id) === JSON.stringify(req.user._id) ||
    req.user.role !== 'customer'
  ) {
    next();
  } else {
    return next(new AppError('You are not owner!', 403));
  }
};

exports.checkStatus = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === 'Served') {
    return next(
      new AppError(`This order was served! You can't cancel it`, 400)
    );
  } else {
    next();
  }
};

// Order Routes

exports.getAllOrders = factory.getAll(Order);
exports.getOrderById = factory.getOne(Order, { path: 'user' });
exports.deleteOrder = factory.deleteOne(Order);

exports.createOrder = catchAsync(async (req, res, next) => {
  if (
    req.body.orderType === 'InRestaurant' &&
    (req.body.tableNumber === undefined || req.body.tableNumber === null)
  ) {
    return next(
      new AppError(
        `We will serve you in restaurant.You have to sign your table number.`,
        400
      )
    );
  }
  const order = await Order.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: order,
    },
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const oldOrder = await Order.findById(req.params.id);
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (
    oldOrder.orderStatus !== 'Preparing' &&
    order.orderStatus === 'Preparing'
  ) {
    order.controlInventory();
  }

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

// Stats and history
exports.getMyOrders = catchAsync(async (req, res, next) => {
  console.log(req.user.id);
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({
    status: 'success',
    data: {
      orders,
    },
  });
});

exports.getOrderStats = catchAsync(async (req, res, next) => {
  const stats = await Order.aggregate([
    {
      $unwind: '$foods',
    },
    {
      $group: {
        _id: '$foods',
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

exports.getOrderStatsByUser = catchAsync(async (req, res, next) => {
  const stats = await Order.aggregate([
    {
      $unwind: '$user',
    },
    {
      $group: {
        _id: '$user',
        foods: { $push: '$foods' },
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
  await Order.deleteMany();
  res.status(204).json({
    status: 'success',
    message: 'All Data deleted',
  });
});
