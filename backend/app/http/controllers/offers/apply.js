const Offers = require("../../../models/Offers");

exports.applyToOffer = (req, res) => {
  Offers.findById(req.body.id).then(offer => {
   if (!offer) {
    return res.status(404).json("Offer not found");
   }
   if (!offer.applicants.includes(req.body.applicantEmail)) {
     offer.applicants.push(req.body.applicantEmail)
     offer
        .save()
        .then(offer => res.json(offer.applicants))
        .catch(err => console.log(err));
   }
   else {
    return res.status(404).json("User already applied to offer")
   }
   
   
  })
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
   }
   else {
    return res.status(404).json("User already disaplied to offer")
   }
   
   
  })
 };