const main = {};

main.registerController = require("../http/controllers/auth/registerController");
main.loginController = require("../http/controllers/auth/loginController");
main.resetPasswordController = require("../http/controllers/auth/resetPasswordController");
main.updateController = require("../http/controllers/auth/updateController");
main.getSkillsList = require("../http/controllers/skills/getSkillsList");
main.getOffers = require("../http/controllers/offers/getOffers");
main.company = require("../http/controllers/company/company");
main.getUsers = require("../http/controllers/auth/userController");
main.apply = require("../http/controllers/offers/apply");
main.removeOffer = require("../http/controllers/offers/getOffers");
main.removeSkill = require("../http/controllers/skills/getSkillsList");
main.createSkill = require("../http/controllers/skills/getSkillsList");
main.createOffer = require("../http/controllers/offers/getOffers");

module.exports = main;
