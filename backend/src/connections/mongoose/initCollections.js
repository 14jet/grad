require("dotenv").config({
  path: require("path").join(__dirname, "..", "..", "..", ".env"),
});
const Company = require("../../models/company.model");
const Guide = require("../../models/guide.model");
const GuideCategory = require("../../models/guides-category.model");
const Order = require("../../models/order.model");
const Place = require("../../models/place.model");
const Term = require("../../models/term.model");
const Tour = require("../../models/tour.model");
const User = require("../../models/user.model");
const Visa = require("../../models/visa.model");
const VisaOrder = require("../../models/visa-order.model");

require("./mongoose.connection")()
  .then(() => {
    importData(Company);
    importData(Guide);
    importData(GuideCategory);
    importData(Order);
    importData(Place);
    importData(Term);
    importData(Tour);
    importData(User);
    importData(Visa);
    importData(VisaOrder);
  })
  .catch((err) => {
    console.error(err);
  });

async function importData(Model) {
  try {
    // clear all current documents
    await Model.deleteMany({});

    const modelName = Model.modelName;
    console.log("Deleted ", modelName);

    // insert documents
    const data = require(`./data/${modelName}.json`);
    await Model.insertMany(data);
    console.log("Inserted successfully");
  } catch (error) {
    console.error(`Error when insert data ${modelName}:`);
    console.error(error);
  }
}
