const User = require("../../../models/Users");


exports.update = (req, res) => {
 // const update = { firstname: req.body.firstname, lastname: req.body.lastname }
 // User.findOneAndUpdate(
 //  { email: req.body.email }, update, { new: true },  (err, data) => {
 //   if (err) throw err
 //   console.log('yes')
 //   return res.status(200, data);
 //  });
 User.findOne({ email: req.body.email }).then(user => {
  // Check for user
  if (!user) {
    // errors.email = "User not found";
    return res.status(404).json("user not found");
  }
  console.log(user)
  user.firstname = req.body.firstname
  user.lastname = req.body.lastname
  user
        .save()
        .then(user => res.json("User updated successfully"))
        .catch(err => console.log(err));
});
};   
