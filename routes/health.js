const { Router } = require("express");
const { health } = require("../controllers/health.controller");

const healthRouter = Router();

healthRouter.get("/", health);

module.exports = {
  healthRouter,
};
