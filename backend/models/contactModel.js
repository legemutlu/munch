const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'A contact must have a address'],
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, 'A contact must have a phone number'],
    trim: true,
  },
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
