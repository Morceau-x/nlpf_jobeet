const Offers = require("../../../models/Offers");
const User = require("../../../models/Users");


async function getMachingOffers(email) {

  const offers = await Offers.find({}).then(offer => { return offer });
  const user = await User.findOne({ email: email }).then(user => { return user });

  return { offers, user }
}


exports.getAllOffers = (req, res) => {
  getMachingOffers(req.body.email).then(result => {
    let out = []
    let offers = result.offers
    let user = result.user
    let userSkills = [].concat(user.techSkills).concat(user.softSkills)
    offers.forEach(function (offer) {
      let newObj = JSON.parse(JSON.stringify(offer));

      let matchedSkills = userSkills.filter(x => offer.askedSkills.includes(x))
      console.log(matchedSkills)
      let matchScore = Math.round((matchedSkills.length / offer.askedSkills.length) * 100)
      newObj['matchScore'] = matchScore
      console.log(matchScore)
      out.push(newObj)
    });

    return res.json(out);
  }).catch(err => {
    console.error(err)
  });
};


exports.getCompanyOffers = (req, res) => {
  Offers.find({}).then(offers => {
    if (!offers) {
      return res.status(404).json("Offer not found");
    }

    offers = offers.filter(offer => offer.company === req.query.company);
    console.log(offers);
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
