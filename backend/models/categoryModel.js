const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A category must have a name'],
    trim: true,
  },
  topCategory: {
    type: String,
    enum: ['main', 'sides', 'drinks', 'desserts'],
    required: [true, 'A category must have a top category'],
  },
  foods: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Food',
    },
  ],
  imageCover: {
    type: String,
    required: [true, 'A category must have a image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  slug: {
    type: String,
  },
});

/* categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'foods',
    select:
      '-ingredient -description -__v -slug -secretFood -category -price -calorie -preparationTime -images -ratingsQuantity -ratingsAverage',
  });
  next();
}); */

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

categorySchema.pre(/^find/, function (next) {
  this.start = Date.now();
  next();
});

categorySchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
