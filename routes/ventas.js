var express = require("express");
var router = express.Router();

var ventasController = require("../controllers/ventasController");


router.get("/paginado/", ventasController.getAllPaginate);
router.get("/usuario/:id", ventasController.getSalesByUser);

router.get("/", ventasController.getAll);
router.get("/:id", ventasController.getById);
router.post("/", ventasController.create);
router.put("/:id", ventasController.update);
router.delete("/:id", ventasController.delete);

// EXPORT MODULE
module.exports = router;
