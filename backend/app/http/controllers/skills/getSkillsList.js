const Skills = require("../../../models/Skills");


exports.getSkillsList = (req, res) => {
 Skills.find({}).then(skill => {
  if (!skill) {
   return res.status(404).json("skills not found");
  }
  return res.json(skill)
 })
};