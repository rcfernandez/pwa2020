var express = require("express");
var router = express.Router();


var productosController = require("../controllers/productosController");

var authController = require("../controllers/authController");
var validateToken = authController.validateToken;   // VALIDACION

  
router.post("/upload/", productosController.upload);   // paginado
router.get("/paginado/", productosController.getAllPaginate);   // paginado
router.get("/destacados/", productosController.getDestacados);   // destacados
// router.get("/precio/:min?/:max?", productosController.getByPrice);     // por precio
router.get("/categoria/:id", productosController.getByCategory);     // por categoria
router.get("/buscar/query", productosController.getByQuery);     // por query

// C.R.U.D.
router.get("/", productosController.getAll);
router.get("/:id", productosController.getById);
router.post("/",validateToken, productosController.create);
router.put("/:id",validateToken, productosController.update);
router.delete("/:id",validateToken, productosController.delete);



//console.log(req.params.id); // cuando enviamos el JSON por parametro /:id
//console.log(req.query); // cuando enviamos el JSON via query string /?buscar=sarasa
//console.log(req.body);  //cuando enviamos el JSON via body

module.exports = router;
