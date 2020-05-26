var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.get("/", usuariosController.getAll);
router.get("/:id", usuariosController.getById);
router.post("/registro", usuariosController.create);
router.post("/login", usuariosController.login);

module.exports = router;
