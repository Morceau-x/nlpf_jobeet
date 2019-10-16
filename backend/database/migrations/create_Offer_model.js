module.exports = {
  offerName: {
    type: String,
    required: true
  },
  company: { 
    type: String,
    required: true
  },
  shortDesc: {
    type: String,
    required: true
  },
  fullDesc: {
    type: String,
    required: true
  },
  recruiter: {
    type: String,
    required: true
  },
  askedSkills:[{
    type: String
  }],
  hiddenSkills:[{
    type: String
  }],
  matchPercentage: {
    type: Object,
    default: {}
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