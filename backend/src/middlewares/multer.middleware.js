const multer = require("multer");
const { v4: uuid } = require("uuid");

const defaultHandler = (rawName) => {
  const stringHandler = require("../helpers/stringHandler");
  return stringHandler.slugify(rawName);
};

const uniqueSuffix = () => {
  return (
    Math.round(Math.random() * 10000).toString() +
    "-" +
    Math.round(Math.random() * 10000).toString() +
    "-" +
    Math.round(Date.now() / 1000)
  );
};

const storage = (filenameHandler = defaultHandler) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = require("../config").uploadDir;
      const d = new Date();
      const year = d.getFullYear().toString();
      const month = d.getMonth().toString();
      const date = d.getDate().toString();

      const destination = require("path").join(uploadPath, year, month, date);
      const fs = require("fs");
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }

      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const fullname = file.originalname;
      const prefix = fullname.slice(0, fullname.lastIndexOf("."));
      const ext = fullname.slice(fullname.lastIndexOf("."));

      filenameHandler(prefix, file);

      cb(null, `${uuid()}-${uniqueSuffix()}${ext}`);
    },
  });

module.exports = {
  upload: (filenameHandler) =>
    multer({
      storage: storage(filenameHandler),
      limits: { fieldSize: 25 * 1024 * 1024 },
    }),
};
