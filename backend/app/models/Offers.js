const mongoose = require("mongoose");
const OfferObject = require("../../database/migrations/create_Offer_model");
const Offer = mongoose.model("Offer", new mongoose.Schema(OfferObject));

module.exports = Offer;