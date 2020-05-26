var express = require("express");
var router = express.Router();

var ventasController = require("../controllers/ventasController");

router.get("/", ventasController.getAll);
router.get("/:id", ventasController.getById);
router.post("/create", ventasController.create);

// EXPORT MODULE
module.exports = router;
