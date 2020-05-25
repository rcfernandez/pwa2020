var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

// /
router.get("/", usuariosController.getAll);

// /ID
router.get("/:id", usuariosController.getById);

// /REGISTRO
router.post("/registro", usuariosController.create);

// /LOGIN
router.post("/login", usuariosController.login);

module.exports = router;
