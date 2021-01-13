const fs = require('fs');
const Contact = require('../models/contactModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.aliasTopCategories = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,title';
  req.query.fields = 'title,price';
  next();
};

// Contact Routes
exports.getAllContacts = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY
  const features = new APIFeatures(Contact.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const categories = await features.query;

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      Contact: newContact,
    },
  });
});

exports.getContactById = catchAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    message: 'Deleted',
  });
});

// Do not use!
exports.loadAllData = catchAsync(async (req, res, next) => {
  const contact = JSON.parse(fs.readFileSync(`data/contactData.json`, 'utf-8'));
  await Contact.create(contact);
  res.status(200).json({
    status: 'success',
    message: 'Datas loaded',
    data: contact,
  });
});

exports.deleteAllData = catchAsync(async (req, res, next) => {
  await Contact.deleteMany();
  res.status(204).json({
    status: 'success',
    message: 'All Data deleted',
  });
});
