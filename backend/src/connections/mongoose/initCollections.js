const Place = require("../../models/place.model");
const GuideCategory = require("../../models/guides-category.model");
const Company = require("../../models/company.model");
const Tour = require("../../models/tour.model");
const Guide = require("../../models/guide.model");
const Term = require("../../models/term.model");
const Visa = require("../../models/visa.model");
const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const initCollectionCreator =
  (Model) =>
  async (onlyInsertWhenEmpty = true, clearAll = false) => {
    try {
      const modelName = Model.modelName;

      // clear all current documents
      if (clearAll) {
        await Model.deleteMany({});
      }

      // insert initial documents
      const document = await Model.findOne();
      if (!onlyInsertWhenEmpty || (onlyInsertWhenEmpty && !document)) {
        const initialData = require(`./initialData/${modelName}.init.json`);
        await Model.insertMany(initialData);
        console.log(`inserted initial ${modelName}`);
      }
    } catch (error) {
      console.error(`Error when insert initialData ${modelName}:`);
      console.error(error);
    }
  };

const initPlace = initCollectionCreator(Place);
const initCompany = initCollectionCreator(Company);
const initTour = initCollectionCreator(Tour);
const initGuide = initCollectionCreator(Guide);
const initGuideCategory = initCollectionCreator(GuideCategory);
const initTerm = initCollectionCreator(Term);
const initVisa = initCollectionCreator(Visa);
const initUser = async () => {
  console.log("\n\n********* start creating user ************");
  try {
    const admin = {
      username: "admin@vvvv.space",
      role: "admin",
      password: "1234567890",
    };
    const clients = [
      {
        username: "client001@vvvv.space",
        role: "client",
        password: "1234567890",
      },
      {
        username: "client002@vvvv.space",
        role: "client",
        password: "1234567890",
      },
      {
        username: "client003@vvvv.space",
        role: "client",
        password: "1234567890",
      },
      {
        username: "client004@vvvv.space",
        role: "client",
        password: "1234567890",
      },
    ];
    const users = [admin, ...clients];

    for (let user of users) {
      const foundUser = await User.findOne({ username: user.username });
      if (foundUser) {
        console.log(`User ${user.username} already exists => not create`);
      }

      if (!foundUser) {
        bcrypt.hash(user.password, 10, async (error, hash) => {
          if (error) {
            throw error;
          }

          await User.create({
            username: user.username,
            password: hash,
            role: user.role,
          });
          console.log("created user ", user.username);
        });
      }
    }
    console.log("********* finished creating user ************\n\n");
  } catch (error) {
    console.error("Error when creating users: ");
    console.error(error);
  }
};

module.exports = {
  initPlace,
  initCompany,
  initTour,
  initGuide,
  initGuideCategory,
  initTerm,
  initVisa,
  initUser,
};
