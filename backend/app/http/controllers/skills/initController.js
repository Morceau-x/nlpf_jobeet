const Skill = require("../../../models/Skills");
const skillsList = require("./init-list.js")

module.exports = {
 init: function () {
  skillsList.forEach((s) =>
   // console.log(s.name, s.type),
   new Skill(s)
    .save()
    .then(console.log("Added skill: " + s.name))
    .catch(err => console.log(err))
  );

 }
};