// Item.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let Items = new Schema({
  unit_name: {
    type: String
  },
  unit_price: {
    type: Number
  }
}, {
    collection: 'items'
  });

module.exports = mongoose.model('Items', Items);