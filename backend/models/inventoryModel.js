const mongoose = require('mongoose');
const Food = require('./foodModel');

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A inventory must have a name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'A inventory must have a category'],
      trim: true,
    },
    quantity: {
      type: Number,
    },
    unitPrice: {
      type: Number,
      required: [true, 'A inventory have an unit price'],
    },
    boughtQuantity: {
      type: Number,
    },
    imageCover: {
      type: String,
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

inventorySchema.virtual('costOf').get(function () {
  return this.boughtQuantity * this.unitPrice;
});

//QUERY MIDDLEWARE
inventorySchema.pre(/^find/, function (next) {
  this.start = Date.now();
  next();
});

inventorySchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});


const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
