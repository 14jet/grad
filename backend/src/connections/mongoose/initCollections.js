require("dotenv").config({
  path: require("path").join(__dirname, "..", "..", "..", ".env"),
});

const Place = require("../../models/place.model");
const User = require("../../models/user.model");


require("./mongoose.connection")()
  .then(() => {
    importData(Place);
    importData(User);
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
