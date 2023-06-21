const stringHandler = require("../../helpers/stringHandler");
const { v4: uuid } = require("uuid");

module.exports.getBase64ImgsFromQuillDelta = (delta) => {
  let base64Imgs = [];
  delta.ops.forEach((item) => {
    if (item.insert.image && item.insert.image.src.startsWith("data:image")) {
      base64Imgs.push({
        base64String: item.insert.image.src,
        caption: item.insert.image.caption,
      });
    }
  });

  return base64Imgs;
};

module.exports.saveBase64ImgsToDisk = async (base64Imgs) => {
  // base64Imgs: [ { base64String, caption } ]
  return await Promise.all(
    base64Imgs.map(({ base64String, caption }, index) => {
      const extension = getMime(base64String);
      const buffer = getBuffer(base64String);
      const fileName = uuid() + extension;

      return saveBufferToDisk(buffer, fileName);
    })
  );

  function getMime(base64String) {
    if (base64String.slice(0, 22).includes("jpg")) return ".jpg";
    if (base64String.slice(0, 22).includes("jpeg")) return ".jpeg";
    if (base64String.slice(0, 22).includes("png")) return ".png";
    if (base64String.slice(0, 22).includes("webp")) return ".webp";
    return ".jpg";
  }

  function getBuffer(base64String) {
    const base64 = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");
    return buffer;
  }

  async function saveBufferToDisk(buffer, fileName) {
    const uploadPath = require("../../config").uploadDir;
    const d = new Date();
    const year = d.getFullYear().toString();
    const month = d.getMonth().toString();
    const date = d.getDate().toString();

    const path = require("path");
    const filePath = path.join(uploadPath, year, month, date, fileName);

    const fileDir = path.join(uploadPath, year, month, date);

    const fs = require("fs");
    try {
      await fs.promises.mkdir(fileDir, { recursive: true });
    } catch (error) {
      console.log(error);
    }

    await require("fs").promises.writeFile(filePath, buffer);
    return filePath.split("/uploads/")[1];
  }
};
