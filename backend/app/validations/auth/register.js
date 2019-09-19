const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm_password = !isEmpty(data.confirm_password)
    ? data.confirm_password
    : "";

  if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.name = "Firstname must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.name = "Firstname field is required";
  }

  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.name = "Lastname must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.name = "Lastname field is required";
  }


  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
