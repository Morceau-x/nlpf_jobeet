const mail = require("../../../../email");
const user = require("../../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../../../config/application").key;

exports.login = (req, res) => {
  // Find user by email
  user.findOne({ email: req.body.email }).then(user => {
    // Check for user
    if (!user) {
      // errors.email = "User not found";
      return res.status(404).json("user not found");
    }

    // Check Password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, firstname: user.firstname, lastname: user.lastname,email: user.email, role: user.role, company: user.company }; // Create JWT Payload

        // Sign Token
        jwt.sign(payload, key, { expiresIn: 36000 }, (err, token) => {
          return res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        // errors.password = "Password incorrect";
        return res.status(400).json("Password Incorrect");
      }
    });
  });
};

exports.currentUser = (req, res) => {
  user.findOne({ email: req.body.email }).then(user => {
    // Check for user
    if (!user) {
      // errors.email = "User not found";
      return res.status(404).json("user not found");
    }
    return res.json(user)
  });
}
