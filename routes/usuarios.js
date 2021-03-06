var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.get("/paginado/", usuariosController.getAllPaginate);

// crud
router.get("/", usuariosController.getAll);
router.get("/:id", usuariosController.getById);
router.post("/", usuariosController.create);
router.put("/:id", usuariosController.update);
router.delete("/:id", usuariosController.delete);


module.exports = router;
