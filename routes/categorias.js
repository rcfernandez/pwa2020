var express = require("express");
var router = express.Router();

var categoriasController = require("../controllers/categoriasController");

// C.R.U.D.
router.get("/", categoriasController.getAll);
router.get("/:id", categoriasController.getById);
router.post("/", categoriasController.create);
router.put("/:id", categoriasController.update);
router.delete("/:id", categoriasController.delete);

module.exports = router;
