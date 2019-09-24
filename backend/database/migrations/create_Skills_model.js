module.exports = {
 name: {
   type: String,
   required: true
 },
 type: { //1 = technical, 2 = soft
   type: Number,
   required: true
 },
 description: {
   type: String,
   required: false
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
