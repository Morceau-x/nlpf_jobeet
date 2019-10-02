const Users = require("../../../models/Users");

exports.getRecruiters = (req, res) => {

    Users.find({}).then(users => {
        if (!users) {
            return res.status(404).json("Company not found");
        }
        return res.json(users.filter(user => user.company === req.query.company).map(user => {
            return {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            }
        }));
    })
};