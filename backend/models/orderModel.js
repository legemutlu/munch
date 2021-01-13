const mongoose = require('mongoose');
const Food = require('./foodModel');
const Inventory = require('./inventoryModel');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  foods: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Food',
    },
  ],
  orderAddress: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  orderType: {
    type: String,
    enum: ['TakeAway', 'HomeDelivery', 'InRestaurant'],
    required: true,
  },
  tableNumber: {
    type: Number,
  },
  orderStatus: {
    type: String,
    enum: ['InQueue', 'Preparing', 'Served', 'Canceled'],
    default: 'InQueue',
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'OnlineCard', 'Cash'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['WaitingPayment', 'Paid', 'Canceled'],
    default: 'WaitingPayment',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Calculate Total Price of Order
orderSchema.pre('save', async function (next) {
  var newPrice = 0;
  if (this.foods.length > 0) {
    for (var i = 0; i < this.foods.length; i++) {
      var getFoodId = this.foods[i];
      var newFood = await Food.findById(getFoodId);
      newPrice = newPrice + newFood.price;
    }
  }
  this.price = newPrice;
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  next();
});

orderSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// Make increment in inventory by order
orderSchema.methods.controlInventory = async function () {
  for (let i = 0; i < this.foods.length; i++) {
    const getFoodId = this.foods[i];
    const newFood = await Food.findById(getFoodId);
    if (newFood.ingredient && newFood.ingredient.length > 0) {
      for (var t = 0; t < newFood.ingredient.length; t++) {
        const getIngredientId = newFood.ingredient[t];
        const getIngredientQuantity = newFood.ingredient[t].ingredientQuantity;
        await Inventory.findByIdAndUpdate(getIngredientId, {
          $inc: { quantity: -getIngredientQuantity },
        });
      }
    }
  }
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
