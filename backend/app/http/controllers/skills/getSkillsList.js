const Skills = require("../../../models/Skills");


exports.getSkillsList = (req, res) => {
  Skills.find({}).then(skill => {
    if (!skill) {
      return res.status(404).json("skills not found");
    }
    return res.json(skill)
  })
};

exports.removeSkill = (req, res) => {
  Skills.remove({ name: req.body.name }).then(response => { return res.json(response) })
}

exports.createSkill = (req, res) => {
  const skill = new Skills({
    name: req.body.name,
    type: req.body.type
  });
  skill
    .save()
    .then(response => res.json(response))
    .catch(err => console.log(err));
}
