var express = require("express");
var router = express.Router();

var authController = require("../controllers/authController");


router.post("/login", authController.login);
router.post("/register/", authController.register);
router.post("/update/", authController.updateUser);

// chequear si el nombre de usuario existe en la BD
router.get("/checkUsername/:name", authController.checkUsername);


module.exports = router;
