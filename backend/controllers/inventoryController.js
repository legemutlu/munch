const fs = require('fs');
const Inventory = require('../models/inventoryModel');
const Foods = require('../models/foodModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');
const AppError = require('../utils/appError');

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


exports.deleteInventory  = catchAsync(async (req, res, next) => {

  const foods = await Foods.find()
  if(foods){
    for (let i = 0; i < foods.length; i++) {
      let getFoods = foods[i];
      if(getFoods.ingredient.length > 0){
        for (let j = 0; j < getFoods.ingredient.length; j++) {
          console.log(getFoods.ingredient)
          if(getFoods.ingredient[j]._id._id.toString() === req.params.id){
            console.log("here2")
            await Foods.findByIdAndUpdate( { _id: getFoods._id  }, { $pull: { ingredient: getFoods.ingredient[j]  } } )
          }
        }
      }
    }
  }

  const doc = await Inventory.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

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
