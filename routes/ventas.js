var express = require("express");
var router = express.Router();

var ventasController = require("../controllers/ventasController");

// GET /
router.get("/", ventasController.getAll);

// GET /:ID
router.get("/:id", ventasController.getById);

// POST /CREATE
router.post("/create", ventasController.create);

// EXPORT MODULE
module.exports = router;
