const Offers = require("../../../models/Offers");
const User = require("../../../models/Users");


async function getMachingOffers(email) {

  const offers = await Offers.find({}).then(offer => { return offer });
  const user = await User.findOne({ email: email }).then(user => { return user });

  return { offers, user }
}


exports.getAllOffers = (req, res) => {
  getMachingOffers(req.body.email).then(result => {
    let offers = result.offers;
    let user = result.user;
    let userSkills = [].concat(user.techSkills).concat(user.softSkills);
    if (user.role === 2) {
      return res.json(offers)
    }
    offers.forEach(function (offer) {
      let matchedSkills = userSkills.filter(x => offer.askedSkills.includes(x));
      offer.matchPercentage[user.email] = Math.round((matchedSkills.length / offer.askedSkills.length) * 100);
      offer.markModified('matchPercentage')
      offer.save();
    });

    return res.json(offers);
  }).catch(err => {
    console.error(err)
  });
};

exports.removeOffer = (req, res) => {
  Offers.remove({ _id: req.body.id }).then(offer => {return res.json(offer)})
};


exports.getCompanyOffers = (req, res) => {
  Offers.find({}).then(offers => {
    if (!offers) {
      return res.status(404).json("Offer not found");
    }

    offers = offers.filter(offer => offer.company === req.query.company);
    return res.json(offers)
  })
};

exports.getOfferById = (req, res) => {
  //console.log(req.body)
  Offers.findById(req.body.id).then(offer => {
    if (!offer) {
      return res.status(404).json("Offer not found");
    }
    return res.json(offer)
  })
};
