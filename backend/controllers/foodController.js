const multer = require('multer');
const sharp = require('sharp');
const Food = require('../models/foodModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');
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

exports.uploadFoodImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeFoodImages = catchAsync(async (req, res, next) => {
  if (typeof req.files === "undefined") return next();
  if (!req.files.imageCover && !req.files.images) return next();


  // 1) Cover image
  req.body.imageCover = `food-${req.params.id}-${Date.now()}-cover.jpeg`;

  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`frontend/public/static/images/foods/${req.body.imageCover}`);

  // 2) Images
  req.body.images = [];
  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `food-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`frontend/public/static/images/foods/${filename}`);

        req.body.images.push(filename);
      })
    );
  }

  next();
});

exports.aliasTopFoods = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage';
  next();
};

//  Routes
exports.getAllFoods = factory.getAll(Food);
exports.getFoodById = factory.getOne(Food, { path: 'reviews' });
exports.createFood = factory.createOne(Food);

exports.updateFood = catchAsync(async (req, res, next) => {
  const doc = await Food.findById(req.params.id);
  const updateDoc = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updateDoc) {
    return next(new AppError('No document found with that ID', 404));
  }

  if(req.body.secretFood === true){
    doc.deleteSecretFoodInCategory();
    updateDoc.deleteSecretFoodInCategory();
  }

  if (req.body.category) {
    doc.deleteCategory();
    updateDoc.updateCategory();
  }

  res.status(200).json({
    status: 'success',
    data: updateDoc,
  });
});

exports.deleteFood = catchAsync(async (req, res, next) => {
  const food = await Food.findById(req.params.id);

  if (food) {
    food.deleteCategory();
  }

  const deletedFood = await Food.findByIdAndDelete(req.params.id);
  if (!deletedFood) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

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
