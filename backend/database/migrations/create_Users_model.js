module.exports = {
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true 
  },
  techSkills:[{
    type: String
  }],
  softSkills:[{
    type: String
  }],
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  company: {
    type: String,
    required: true,
    default: "none"
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
