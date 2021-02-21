const mongoose = require('mongoose');
const Food = require('./foodModel');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    food: {
      type: mongoose.Schema.ObjectId,
      ref: 'Food',
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ user: 1, food: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name image',
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (foodId) {
  const stats = await this.aggregate([
    {
      $match: { food: foodId },
    },
    {
      $group: {
        _id: '$food',
        numRatings: { $sum: 1 },
        avgRatings: { $avg: '$rating' },
      },
    },
  ]);

  if (stats[0]) {
    await Food.findByIdAndUpdate(foodId, {
      ratingsAverage: stats[0].avgRatings,
      ratingsQuantity: stats[0].numRatings,
    });
  } else {
    await Food.findByIdAndUpdate(foodId, {
      ratingsAverage: 2.5,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.food);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.updatedDocument = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.updatedDocument.constructor.calcAverageRatings(
    this.updatedDocument.food
  );
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
