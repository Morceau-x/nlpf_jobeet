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

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return controller.loginController.currentUser(req, res);
  }
);
router.post("/update", (req, res) => {
  return controller.updateController.update(req, res);
});

router.get("/getSkills", (req, res) => {
  return controller.getSkillsList.getSkillsList(req, res);
})

module.exports = router;
