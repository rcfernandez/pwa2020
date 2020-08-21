var express = require("express");
var router = express.Router();

var categoriasController = require("../controllers/categoriasController");


// validacion
var authController = require("../controllers/authController");
var validateToken = authController.validateToken;
var validateTokenAdmin = authController.validateTokenAdmin;


// subcategorias crud
router.put("/borrarsubcategoria/:id", validateTokenAdmin, categoriasController.deleteSubcategory);
router.put("/altasubcategoria/:id", validateTokenAdmin, categoriasController.createSubcategory);
router.put("/modificarsubcategoria/:id", validateTokenAdmin, categoriasController.updateSubcategory);



// categorias
router.get("/paginado", categoriasController.getAllPaginate);

// categorias crud
router.get("/", categoriasController.getAll);
router.get("/:id", categoriasController.getById);
router.post("/", validateTokenAdmin, categoriasController.create);
router.put("/:id", validateTokenAdmin, categoriasController.update);
router.delete("/:id", validateTokenAdmin, categoriasController.delete);

module.exports = router;
