const { Router } = require("express");
const RecordController = require("../../controllers/record.controller");

const routes = Router();

routes.post("/records", RecordController.queryObject);

module.exports = routes;
