const mongoose = require("mongoose");
const SkillsObject = require("../../database/migrations/create_Skills_model");
const Skills = mongoose.model("Skills", new mongoose.Schema(SkillsObject));

module.exports = Skills;
