module.exports = async (req, res, next) => {
  const fs = require("fs");
  const path = require("path");
  const { uploadDir, cacheDir } = require("../../config");
  const url = require("url");
  const availableDimensions = new Map([
    ["800x530", { w: 800, h: 530 }],
    ["360x240", { w: 360, h: 240 }],
    ["150x100", { w: 150, h: 100 }],
  ]);

  try {
    const d = req.query?.d;
    const [year, month, date, fileName] = url
      .parse(req.url)
      .pathname.slice(1)
      .split("/")
      .map((item) => item.toString());

    const originImage = path.join(uploadDir, year, month, date, fileName);

    // if not require dimensions
    if (!d) {
      return sendFile(originImage);
    }

    // if require dimenisions
    // check if the requested dimensions are supported
    const validDimensions = availableDimensions.get(d);
    // if not supported
    if (!validDimensions) {
      return notFound();
    }

    // originalName + ?d=d + ext
    const cacheImageDir = path.join(cacheDir, year, month, date, d);
    const cacheImage = path.join(cacheImageDir, fileName);

    // if caching image already exists
    if (fs.existsSync(cacheImage)) {
      return sendFile(cacheImage);
    }

    // otherwise generate a new image with requested dimensions
    if (!fs.existsSync(cacheImageDir)) {
      fs.mkdirSync(cacheImageDir, { recursive: true });
    }

    const sharp = require("sharp");
    const transformer = sharp().resize({
      width: validDimensions.w,
      height: validDimensions.h,
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy,
    });
    const rs = fs.createReadStream(originImage);
    const ws = fs.createWriteStream(cacheImage);

    rs.pipe(transformer).pipe(ws);

    ws.on("error", (err) => {
      console.error(err);
      notFound();
    });

    rs.on("error", (err) => {
      console.error(err);
      notFound();
    });

    ws.on("finish", () => {
      sendFile(cacheImage);
    });
  } catch (error) {
    console.error(error);
    notFound();
  }

  function sendFile(filePath) {
    const mime = {
      html: "text/html",
      txt: "text/plain",
      css: "text/css",
      gif: "image/gif",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      webp: "image/jpeg",
      png: "image/png",
      svg: "image/svg+xml",
      js: "application/javascript",
    };

    const ext = filePath.slice(filePath.lastIndexOf(".") + 1);
    var s = fs.createReadStream(filePath);

    s.on("error", function (err) {
      console.log(err);
      notFound();
    });

    s.on("open", function () {
      res.set("Content-Type", mime[ext] || "text/plain");
      s.pipe(res);
    });
  }

  function notFound() {
    res.set("Content-Type", "text/plain");
    res.status(404).end("Not found");
  }
};
