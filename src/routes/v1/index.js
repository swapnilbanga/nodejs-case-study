const { Router } = require("express");
const RecordController = require("../../controllers/record.controller");

const routes = Router();

routes.post("/objects", RecordController.queryObject);

module.exports = routes;
