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

exports.editCompany = (req, res) => {
    Companies.findOne({name: req.body.old}).then(company => {
        // Check for user
        if (!company) {
            // errors.email = "User not found";
            return res.status(404).json("user not found");
        }
        company.name = req.body.name;
        company.description = req.body.description;
        company
            .save()
            .then(company => res.json("User updated successfully"))
            .catch(err => console.log(err));
    });
};

exports.addCompany = (req, res) => {
    let company = new Companies({
        name: req.body.name,
        description: req.body.description === "" ? " " : req.body.description
    });
    company.save().then(company => res.json("User updated successfully"))
        .catch(err => console.log(err));
};