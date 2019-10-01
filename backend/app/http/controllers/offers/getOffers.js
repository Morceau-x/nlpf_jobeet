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
 Offers.find({}).then(offer => {
  if (!offer) {
   return res.status(404).json("Offer not found");
  }
  offer.filter(offer => offer.company === req.query.company);
  return res.json(offer)
 })
};