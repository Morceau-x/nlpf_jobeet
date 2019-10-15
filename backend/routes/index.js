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
  return controller.getOffers.getOfferById(req, res);
});

router.post("/removeOffer", (req, res) => {
  return controller.getOffers.removeOffer(req, res);
});

router.post("/applicant/add", (req, res) => {
  return controller.apply.applyToOffer(req, res);
});

router.post("/applicant/exist", (req, res) => {
  return controller.apply.applicantExists(req, res);
});


router.post("/applicant/remove", (req, res) => {
  return controller.apply.removeCandidate(req, res);
});

router.get("/company", (req, res) => {
  return controller.company.getCompany(req, res);
});

router.post("/company/edit", (req, res) => {
  return controller.company.editCompany(req, res);
});

router.post("/company/add", (req, res) => {
  return controller.company.addCompany(req, res);
});


router.get("/companies", (req, res) => {
  return controller.company.getAllCompanies(req, res);
});

router.get("/recruiters", (req, res) => {
  return controller.getUsers.getRecruiters(req, res);
});

router.get("/applicants", (req, res) => {
  return controller.getUsers.getAllApplicants(req, res);
});

router.post("/removeSkill", (req, res) => {
  return controller.removeSkill.removeSkill(req, res);
});

router.post("/createSkill", (req, res) => {
  return controller.createSkill.createSkill(req, res);
});



module.exports = router;
