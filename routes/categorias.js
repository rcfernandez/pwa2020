var express = require("express");
var router = express.Router();

var categoriasController = require("../controllers/categoriasController");


// subcategorias
router.put("/borrarsubcategoria/:id", categoriasController.deleteSubcategory);
router.put("/altasubcategoria/:id", categoriasController.createSubcategory);
router.put("/modificarsubcategoria/:id", categoriasController.updateSubcategory);

// categorias
router.get("/paginado", categoriasController.getAllPaginate);

router.get("/", categoriasController.getAll);
router.get("/:id", categoriasController.getById);
router.post("/", categoriasController.create);
router.put("/:id", categoriasController.update);
router.delete("/:id", categoriasController.delete);

module.exports = router;
