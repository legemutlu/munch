const factory = require('./handlerFactory');
const Contact = require('../models/contactModel');


exports.getAllContacts = factory.getAll(Contact);
exports.getContactById = factory.getOne(Contact);
exports.createContact = factory.createOne(Contact);
exports.updateContact = factory.updateOne(Contact);
exports.deleteContact = factory.deleteOne(Contact);