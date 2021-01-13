const fs = require('fs');
const Inventory = require('../models/inventoryModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');

exports.aliasTopInventories = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name,price,ratingsAverage';
  next();
};

// Inventory Routes
exports.getAllInventories = factory.getAll(Inventory);
exports.getInventoryById = factory.getOne(Inventory, { path: 'reviews' });
exports.createInventory = factory.createOne(Inventory);
exports.updateInventory = factory.updateOne(Inventory);
exports.deleteInventory = factory.deleteOne(Inventory);

exports.getInventoryStats = catchAsync(async (req, res, next) => {
  const stats = await Inventory.aggregate([
    {
      $match: { quantity: { $gte: 1 } },
    },
    {
      $group: {
        _id: { $toUpper: '$category' },
        numInventories: { $sum: 1 },
        avgUnitPrice: { $avg: '$unitPrice' },
        minUnitPrice: { $min: '$unitPrice' },
        maxUnitPrice: { $max: '$unitPrice' },
      },
    },
    {
      $sort: { avgUnitPrice: 1 },
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
  const plan = await Inventory.aggregate([
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
        numInventoryStarts: { $sum: 1 },
        inventory: {
          $push: {
            inventoryID: '$_id',
            inventoryCategory: '$category',
            inventoryName: '$name',
          },
        },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { numInventoryStarts: -1 },
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
  const inventories = JSON.parse(
    fs.readFileSync('data/inventoriesData.json', 'utf-8')
  );
  await Inventory.create(inventories);
  res.status(200).json({
    status: 'success',
    message: 'Datas loaded',
    data: inventories,
  });
});

exports.deleteAllData = catchAsync(async (req, res, next) => {
  await Inventory.deleteMany();
  res.status(204).json({
    status: 'success',
    message: 'All Data deleted',
  });
});
