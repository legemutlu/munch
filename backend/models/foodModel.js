const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const Category = require('./categoryModel');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A food must have a name'],
      unique: true,
      trim: true,
      minlength: [3, 'A name must have at least 3 characters'],
      maxlength: [40, 'A name must have at least 40 characters'],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'A food must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current document doc on new document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    ingredient: [
      {
        _id: {
          type: mongoose.Schema.ObjectId,
          ref: 'Inventory',
        },
        ingredientQuantity: {
          type: Number,
          required: [true, 'A ingredient must have a quantity'],
        },
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [10, 'Rating must be above 10.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
    calorie: {
      type: Number,
      required: [true, 'A food must have a calorie'],
    },
    imageCover: {
      type: String,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    preparationTime: {
      type: Number,
      required: [true, 'A food must have a preparation time'],
    },
    slug: {
      type: String,
    },
    secretFood: {
      type: Boolean,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

foodSchema.index({ price: 1, ratingsAverage: -1 });
foodSchema.index({ slug: 1 });

foodSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'food',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
foodSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});


//QUERY MIDDLEWARE
/*foodSchema.pre(/^find/, function (next) {
  this.find({ secretFood: { $ne: true } });
  this.start = Date.now();
  next();
});*/

foodSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

foodSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: '-__v -foods -images -imageCover',
  }).populate({
    path: 'ingredient._id',
    select: '-__v -category -costOf -createdAt -quantity -imageCover -id',
  });

  next();
});

foodSchema.pre('save', async function (next) {
  if(this.category){
    await Category.findByIdAndUpdate({_id :this.category}, {
      $push: { foods: this._id }
    })
  }
  next();
});

/*//AGGREGATION MIDDLEWARE
foodSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretFood: { $ne: true } } });
  next();
});*/



foodSchema.methods.updateCategory = async function(){
  if (!this.isModified('category')){
    console.log("here")
    await Category.findByIdAndUpdate({_id :this.category._id}, {
      $push: { foods: this._id }
    })
  }
}

foodSchema.methods.deleteCategory = async function(){
  if (!this.isModified('category')){
    await Category.findByIdAndUpdate({_id :this.category._id}, {
      $pull: { foods: this._id }
    })
  }
}


const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
