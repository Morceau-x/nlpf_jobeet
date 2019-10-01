const Offers = require("../../../models/Offers");

exports.getAllOffers = (req, res) => {
 Offers.find({}).then(offer => {
  if (!offer) {
   return res.status(404).json("skills not found");
  }
  return res.json(offer)
 })
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