const main = {};

main.registerController = require("../http/controllers/auth/registerController");
main.loginController = require("../http/controllers/auth/loginController");
main.resetPasswordController = require("../http/controllers/auth/resetPasswordController");
main.updateController = require("../http/controllers/auth/updateController");


module.exports = main;
