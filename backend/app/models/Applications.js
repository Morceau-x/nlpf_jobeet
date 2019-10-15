const mongoose = require("mongoose");
const ApplicationObject = require("../../database/migrations/create_Applications_model");
const Application = mongoose.model("Application", new mongoose.Schema(ApplicationObject));

module.exports = Application;