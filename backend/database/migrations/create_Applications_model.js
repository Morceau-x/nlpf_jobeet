module.exports = {
  offer: {
    type: ObjectId,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  userAccepted: {
    type: Boolean,
    required: true
  },
  companyAccepted: {
    type: String,
    required: true
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