module.exports = class ImageHandler {
  fsPromises = require("fs").promises;
  path = require("path");
  stringHandler = require("./stringHandler");
  logger = require("./logger");

  constructor(folderPath, urlPrefix) {
    this.folderPath = folderPath;
    this.urlPrefix = urlPrefix;
    // folderPath: C:/.../uploads/guides/guideId
    // urlPrefix: http://localhost:5000/images/tours/tourId
  }

  async saveBufferToDisk(buffer, fileName) {
    await this.fsPromises.writeFile(
      this.path.join(this.folderPath, fileName),
      buffer
    );
    return this.getUrlByFileName(fileName);
  }

  getUrlByFileName(fileName) {
    return `${this.urlPrefix}/${fileName}`;
  }

  getFileNameByUrl(url) {
    return url.slice(url.lastIndexOf("/") + 1);
  }

  getFileRefByUrl(url) {
    const fileName = this.getFileNameByUrl(url);
    return `${this.folderPath}/${fileName}`;
  }

  getFileRefByFileName(fileName) {
    return `${this.folderPath}/${fileName}`;
  }

  deleteByUrl(url) {
    this.fsPromises.unlink(this.getFileRefByUrl(url)).catch((error) => {
      console.error(error);
      this.logger(error.stack);
    });
  }

  getMimeTypeOfBase64String = (s) => {
    if (s.slice(0, 22).includes("jpg")) return ".jpg";
    if (s.slice(0, 22).includes("jpeg")) return ".jpeg";
    if (s.slice(0, 22).includes("png")) return ".png";
    if (s.slice(0, 22).includes("webp")) return ".webp";
    return ".jpg";
  };

  bufferFromBase64String(base64String) {
    const base64 = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");
    return buffer;
  }

  async saveImageToDisk(file, slug) {
    const fileExtension = this.stringHandler.getExtension(file.originalname);
    const fileName = `${slug}-${this.stringHandler.randomTail()}${fileExtension}`;
    return await this.saveBufferToDisk(file.buffer, fileName);
  }

  async renameImage(oldUrl, newSlug) {
    const newFileName =
      newSlug +
      "-" +
      this.stringHandler.randomTail() +
      this.stringHandler.getExtension(oldUrl);

    await this.fsPromises.copyFile(
      this.getFileRefByUrl(oldUrl),
      this.getFileRefByFileName(newFileName)
    );
    const newUrl = this.getUrlByFileName(newFileName);
    return newUrl;
  }
};
