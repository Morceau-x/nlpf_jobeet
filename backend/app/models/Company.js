const mongoose = require("mongoose");
const CompanyObject = require("../../database/migrations/create_Company_model");
const Company = mongoose.model("Company", new mongoose.Schema(CompanyObject));

module.exports = Company;