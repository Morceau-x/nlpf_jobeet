module.exports = {
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  description: {
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