const Offer = require("../../../models/Offers");
const OffersList = require("./init-list.js")

module.exports = {
 init: function () {
  OffersList.forEach((s) =>
   new Offer(s)
    .save()
    .then(console.log("Added offer: " + s.offerName))
    .catch(err => console.log(err))
  );
 }
};