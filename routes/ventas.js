var express = require("express");
var router = express.Router();

var ventasController = require("../controllers/ventasController");

// validacion
var authController = require("../controllers/authController");
var validateToken = authController.validateToken;
var validateTokenAdmin = authController.validateTokenAdmin;


router.get("/paginado/", validateTokenAdmin, ventasController.getAllPaginate);
router.get("/usuario/:id", validateToken, ventasController.getSalesByUser);     //usertoken

//crud
router.get("/", validateTokenAdmin, ventasController.getAll);
router.get("/:id", validateTokenAdmin, ventasController.getById);
router.post("/", validateToken, ventasController.create);               // usertoken
router.put("/:id", validateTokenAdmin, ventasController.update);
router.delete("/:id", validateTokenAdmin, ventasController.delete);


module.exports = router;
