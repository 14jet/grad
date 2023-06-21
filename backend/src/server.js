require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});
const { createServer } = require("http");
const app = require("express")();
const httpServer = createServer(app);
const {
  initSocketIO,
  getSocketIO,
} = require("./connections/socket.io/socketIO.init");

// middlewares
app.use(require("./middlewares/cors.middleware"));
app.set("trust proxy", 1);
app.use(require("helmet")({ crossOriginResourcePolicy: false }));
app.use(require("body-parser").json({ limit: "50mb" }));
app.use(require("./middlewares/languages.middleware"));

// initialize socket.io
initSocketIO(httpServer);

// image route
app.use("/images", require("./routes/images"));

// client routes
app.use("/tour", require("./routes/client/tour.route"));
app.use("/guide", require("./routes/client/guide.route"));
app.use("/visa", require("./routes/client/visa.route"));
app.use("/term", require("./routes/client/term.route"));
app.use("/company-info", require("./routes/client/company.route"));

// admin routes
const flushCache = require("./middlewares/cache.middleware")(0, true);
app.use("/admin/guide", flushCache, require("./routes/admin/guide.route"));
app.use("/admin/tour", flushCache, require("./routes/admin/tour.route"));
app.use("/admin/term", flushCache, require("./routes/admin/term.route"));
app.use("/admin/visa", flushCache, require("./routes/admin/visa.route"));
app.use("/admin/place", flushCache, require("./routes/admin/place.route"));
app.use("/admin/company", flushCache, require("./routes/admin/company.route"));
app.use("/admin/user", flushCache, require("./routes/admin/user.route"));
app.use("/admin/order", flushCache, require("./routes/admin/order.route"));

// not found
app.all("*", require("./middlewares/notFound.middleware"));

// errors handler
app.use(require("./middlewares/errorHandler.middleware"));

// socket.io
const io = getSocketIO();
io.on("connection", (socket) => {
  socket.join("ADMIN");
});

const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  // connect to mnongodb
  require("./connections/mongoose/mongoose.connection")().catch((error) => {
    console.error(error);
  });

  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} environment`
  );
});
