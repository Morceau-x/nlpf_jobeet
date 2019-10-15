const Offers = require("../../../models/Offers");
const Users = require("../../../models/Users");
const Applications = require("../../../models/Applications");

exports.applyToOffer = (req, res) => {
    if (req.body.id === "")
        res.status(404).json("Invalid empty Id");
    Offers.findById(req.body.id).then(offer => {
        if (!offer)
            return res.status(404).json("Offer not found");
        Users.findOne({email: req.body.applicantEmail}).then(user => {
            if (!user)
                return res.status(404).json("User not found");
            Applications.count({offer: offer._id, user: user._id}).then(n => {
                if (n !== 0)
                    return res.status(404).json("User already applied to offer");
                let application = new Applications({offer: offer._id, user: user._id, userAccepted: true});
                application.save().then(app => res.json("Application sent successfully"))
                    .catch(err => console.log(err));
            }).catch(err => {res.status(404).json("Unhandled error");});
        }).catch(err => {res.status(404).json("Unhandled error");});
    }).catch(err => {res.status(404).json("Unhandled error");});
};

exports.applicantExists = (req, res) => {

    Users.findOne({email: req.body.applicantEmail}).then(user => {
        if (!user)
            return res.status(404).json("User not found");
        Applications.findOne({offer: req.body.id, user: user._id}).then(application => {
            if (!application)
                return res.status(404).json("No applicant found");
            return res.status(200).json("Applicant found");
        }).catch(err => {res.status(404).json("Unhandled error");});
    }).catch(err => {res.status(404).json("Unhandled error");});
};

exports.removeCandidate = (req, res) => {
    Offers.findById(req.body.id).then(offer => {
        if (!offer) {
            return res.status(404).json("Offer not found");
        }
        if (offer.applicants.includes(req.body.applicantEmail)) {
            offer.applicants.splice(offer.applicants.indexOf(req.body.applicantEmail), 1)
            offer
                .save()
                .then(offer => res.json(offer.applicants))
                .catch(err => console.log(err));
        } else {
            return res.status(404).json("User already disaplied to offer")
        }


    })
};