var express = require("express");
var router = express.Router();

var authController = require("../controllers/authController");

// router.post("/registro", usuariosController.create);
router.post("/login", authController.login);


module.exports = router;
