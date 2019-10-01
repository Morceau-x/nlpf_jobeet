const main = {};

main.registerController = require("../http/controllers/auth/registerController");
main.loginController = require("../http/controllers/auth/loginController");
main.resetPasswordController = require("../http/controllers/auth/resetPasswordController");
main.updateController = require("../http/controllers/auth/updateController");
main.getSkillsList = require("../http/controllers/skills/getSkillsList");
main.getOffers = require("../http/controllers/offers/getOffers");
main.getCompany = require("../http/controllers/company/getCompany");
main.getOffers = require("../http/controllers/offers/getOffers")
main.getOfferById = require("../http/controllers/offers/getOffers")
main.applyToOffer = require("../http/controllers/offers/apply")
main.removeCandidate = require("../http/controllers/offers/apply")

module.exports = main;
