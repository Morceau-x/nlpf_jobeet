const main = {};

main.registerController = require("../http/controllers/auth/registerController");
main.loginController = require("../http/controllers/auth/loginController");
main.resetPasswordController = require("../http/controllers/auth/resetPasswordController");
main.updateController = require("../http/controllers/auth/updateController");
main.getSkillsList = require("../http/controllers/skills/getSkillsList");
main.getOffers = require("../http/controllers/offers/getOffers");
main.getCompany = require("../http/controllers/company/getCompany");
main.getUsers = require("../http/controllers/auth/userController");


module.exports = main;
