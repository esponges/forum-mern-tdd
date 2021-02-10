const express = require("express");
const routes = require("./routes/routes");

const createServer = () => {
  // init express
  const app = express();
  // imp routes
  app.use("/api", routes);
  // parse json
  app.use(express.json());
  return app;
};

module.exports = createServer;
