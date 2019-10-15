var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
  offer: {
    type: ObjectId,
    required: true
  },
  user: {
    type: ObjectId,
    required: true
  },
  userAccepted: {
    type: Boolean,
    required: true,
    default: false
  },
  companyAccepted: {
    type: Boolean,
    required: true,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
 };