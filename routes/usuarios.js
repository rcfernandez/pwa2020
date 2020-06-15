var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.get("/", usuariosController.getAll);
router.get("/:id", usuariosController.getById);
router.post("/", usuariosController.create);
router.put("/:id", usuariosController.update);
router.delete("/:id", usuariosController.delete);

router.post("/registro", usuariosController.create);
router.post("/login", usuariosController.login);

module.exports = router;
