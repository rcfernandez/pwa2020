var express = require("express");
var router = express.Router();


var productosController = require("../controllers/productosController");

// validacion
var authController = require("../controllers/authController");
var validateToken = authController.validateToken;
var validateTokenAdmin = authController.validateTokenAdmin;

  
router.post("/upload/", productosController.upload); 
router.get("/paginado/", productosController.getAllPaginate);  
router.get("/destacados/", productosController.getDestacados);   
router.get("/categoria/:id", productosController.getByCategory);    
router.get("/buscar/query", productosController.getByQuery);     

// C.R.U.D.
router.get("/", productosController.getAll);
router.get("/:id", productosController.getById);
router.post("/",validateTokenAdmin, productosController.create);
router.put("/:id",validateTokenAdmin, productosController.update);
router.delete("/:id",validateTokenAdmin, productosController.delete);

module.exports = router;
