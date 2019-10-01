const Company = require("../../../models/Company");
const CompanyList = require("./init-list.js");

module.exports = {
 init: function () {
  CompanyList.forEach((s) =>
   new Company(s)
    .save()
    .then(console.log("Added offer: " + s.name))
    .catch(err=>null)
  );
 }
};