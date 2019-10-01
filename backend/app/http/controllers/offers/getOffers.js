const Offers = require("../../../models/Offers");


exports.getAllOffers = (req, res) => {
 Offers.find({}).then(offer => {
  if (!offer) {
   return res.status(404).json("skills not found");
  }
  return res.json(offer)
 })
};