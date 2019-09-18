module.exports = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true,
    default: 1
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
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
