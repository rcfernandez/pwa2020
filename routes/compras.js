var express = require("express");
var router = express.Router();

var comprasController = require("../controllers/comprasController");

// GET /
router.get("/", comprasController.getAll);

// GET /:ID
router.get("/:id", comprasController.getById);

// POST /CREATE
router.post("/create", comprasController.create);

// EXPORT MODULE
module.exports = router;
