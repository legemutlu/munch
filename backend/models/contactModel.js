const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'A contact must have a address'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'A contact must have a phone number'],
    trim: true,
  },
  wifi:{
    name: String,
    password: String
  },
  workHours:[
    {
      day: String,
      time: String
    }
  ]
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
