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
})

router.get("/getAllOffers", (req, res) => {
  return controller.getAllOffers.getAllOffers(req, res);
})

module.exports = router;
