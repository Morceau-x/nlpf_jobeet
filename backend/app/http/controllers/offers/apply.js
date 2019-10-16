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
            }).catch(err => {
                res.status(404).json("Unhandled error");
            });
        }).catch(err => {
            res.status(404).json("Unhandled error");
        });
    }).catch(err => {
        res.status(404).json("Unhandled error");
    });
};

exports.applicantExists = (req, res) => {

    Users.findOne({email: req.body.applicantEmail}).then(user => {
        if (!user)
            return res.status(404).json("User not found");
        Applications.findOne({offer: req.body.id, user: user._id}).then(application => {
            if (!application)
                return res.status(404).json("No applicant found");
            return res.status(200).json("Applicant found");
        }).catch(err => {
            res.status(404).json("Unhandled error");
        });
    }).catch(err => {
        res.status(404).json("Unhandled error");
    });
};


exports.getUserCandidates = (req, res) => {
    Users.findOne({email: req.body.email}).then(user => {
        if (!user)
            return res.status(404).json("No user");
        if (user.role === 2)
            Offers.find({company: user.company}).then(offers => {
                if (!offers || offers.length === 0)
                    return res.status(404).json("No offers");
                Applications.find().then(applications => {
                    if (!applications || applications.length === 0)
                        return res.status(404).json("No applications");
                    let ids = offers.map(offer => offer._id.toString());
                    Users.find().then(users => {
                        if (!users || users.length === 0)
                            return res.status(404).json("No users");

                        let match = applications.filter(application => (ids.includes(application.offer.toString()))).map(application => {
                            let offer = offers.find(offer => (application.offer.toString() === offer._id.toString()));
                            let user = users.find(user => (application.user.toString() === user._id.toString()));
                            if (!offer || !user)
                                return null;
                            let userSkills = [].concat(user.techSkills).concat(user.softSkills);
                            let matchedSkills = userSkills.filter(x => offer.askedSkills.includes(x));
                            return {
                                id: application._id,
                                user: user,
                                offer: offer,
                                userAccepted: application.userAccepted,
                                companyAccepted: application.companyAccepted,
                                matchPercentage: Math.round((matchedSkills.length / offer.askedSkills.length) * 100),
                                chat: application.chat
                            }
                        });
                        return res.json(match);
                    })
                })
            });
        if (user.role === 0)
            Offers.find().then(offers => {
                if (!offers || offers.length === 0)
                    return res.status(404).json("No offers");
                Applications.find().then(applications => {
                    if (!applications || applications.length === 0)
                        return res.status(404).json("No applications");
                    let ids = offers.map(offer => offer._id.toString());
                    Users.find().then(users => {
                        if (!users || users.length === 0)
                            return res.status(404).json("No users");

                        let match = applications.filter(application => (ids.includes(application.offer.toString()))).map(application => {
                            let offer = offers.find(offer => (application.offer.toString() === offer._id.toString()));
                            let user = users.find(user => (application.user.toString() === user._id.toString()));
                            if (!offer || !user)
                                return null;
                            let userSkills = [].concat(user.techSkills).concat(user.softSkills);
                            let matchedSkills = userSkills.filter(x => offer.askedSkills.includes(x));
                            return {
                                id: application._id,
                                user: user,
                                offer: offer,
                                userAccepted: application.userAccepted,
                                companyAccepted: application.companyAccepted,
                                matchPercentage: Math.round((matchedSkills.length / offer.askedSkills.length) * 100),
                                chat: application.chat
                            }
                        });
                        return res.json(match);
                    })
                })
            });
        if (user.role === 1)
            Applications.find({user: user._id}).then(applications => {
                if (!applications || applications.length === 0)
                    return res.status(404).json("No applications");
                Offers.find().then(offers => {
                    let match = applications.map(application => {
                        let offer = offers.find(offer => (application.offer.toString() === offer._id.toString()));
                        if (!offer || !user)
                            return null;
                        let userSkills = [].concat(user.techSkills).concat(user.softSkills);
                        let matchedSkills = userSkills.filter(x => offer.askedSkills.includes(x));
                        return {
                            id: application._id,
                            user: user,
                            offer: offer,
                            userAccepted: application.userAccepted,
                            companyAccepted: application.companyAccepted,
                            matchPercentage: Math.round((matchedSkills.length / offer.askedSkills.length) * 100),
                            chat: application.chat
                        }
                    });
                    return res.status(200).json(match)
                });
            });
    })
};

exports.getCompanyCandidates = (req, res) => {
    Offers.find({company: req.body.company}).then(offers => {
        if (!offers || offers.length === 0)
            return res.status(404).json("No offers");
        Applications.find().then(applications => {
            if (!applications || applications.length === 0)
                return res.status(404).json("No applications");
            let ids = offers.map(offer => offer._id.toString());
            Users.find().then(users => {
                if (!users || users.length === 0)
                    return res.status(404).json("No users");

                let match = applications.filter(application => (ids.includes(application.offer.toString()))).map(application => {
                    let offer = offers.find(offer => (application.offer.toString() === offer._id.toString()));
                    let user = users.find(user => (application.user.toString() === user._id.toString()));
                    if (!offer || !user)
                        return null;
                    let userSkills = [].concat(user.techSkills).concat(user.softSkills);
                    let matchedSkills = userSkills.filter(x => offer.askedSkills.includes(x));
                    return {
                        id: application._id,
                        user: user,
                        offer: offer,
                        userAccepted: application.userAccepted,
                        companyAccepted: application.companyAccepted,
                        matchPercentage: Math.round((matchedSkills.length / offer.askedSkills.length) * 100)
                    }
                });
                return res.json(match);
            })
        })
    })
};

exports.accept = (req, res) => {
    Applications.findOne({offer: req.body.offer, user: req.body.user}).then(application => {
        if (!application)
            return res.status(404).json("No offers");
        application.companyAccepted = true;
        application.save()
            .then(application => res.json("OK"))
            .catch(err => console.log(err));
    })
};

exports.reject = (req, res) => {
    Applications.deleteOne({offer: req.body.offer, user: req.body.user}).then(application => {
        if (!application)
            return res.status(404).json("No offers");
        return res.json("OK");
    })
};

exports.sendMessage = (req, res) => {
    Applications.findById(req.body.id).then(application => {
        if (!application)
            return res.status(404).json("No application");
        application.chat += req.body.text;
        application.save()
            .then(application => res.json("OK"))
            .catch(err => console.log(err));
    })
};