const express = require("express");
const router = express.Router();
const controller = require("../app/providers/controllerProvider");
const passport = require("passport");

//auth routes
router.post("/register", (req, res) => {
  return controller.registerController.register(req, res);
});
router.post("/login", (req, res) => {
  return controller.loginController.login(req, res);
});

router.post("/current",(req, res) => {
    return controller.loginController.currentUser(req, res);
  }
);
router.post("/update", (req, res) => {
  return controller.updateController.update(req, res);
});

router.get("/getSkillsList", (req, res) => {
  return controller.getSkillsList.getSkillsList(req, res);
});

router.get("/offers/company", (req, res) => {
  return controller.getOffers.getCompanyOffers(req, res);
});
router.post("/getAllOffers", (req, res) => {
  return controller.getOffers.getAllOffers(req, res);
})

router.post("/getOfferById", (req, res) => {
  return controller.getOfferById.getOfferById(req, res);
});

router.post("/apply", (req, res) => {
  return controller.applyToOffer.applyToOffer(req, res);
});

router.post("/removeCandidate", (req, res) => {
  return controller.removeCandidate.removeCandidate(req, res);
});

router.get("/company", (req, res) => {
  return controller.getCompany.getCompany(req, res);
});

router.get("/companies", (req, res) => {
  return controller.getCompany.getAllCompanies(req, res);
});


module.exports = router;
