const Companies = require("../../../models/Company");

exports.getCompany = (req, res) => {

    Companies.find({}).then(company => {
        if (!company) {
            return res.status(404).json("Company not found");
        }
        return res.json(company.find(c => c.name === req.query.company));
    })
};

exports.getAllCompanies = (req, res) => {
    Companies.find({}).then(company => {
        if (!company) {
            return res.status(404).json("Company not found");
        }
        return res.json(company);
    })
};