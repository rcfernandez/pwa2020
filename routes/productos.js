var express = require("express");
var router = express.Router();

var productosController = require("../controllers/productosController");

// C.R.U.D.
router.get("/", productosController.getAll);
router.get("/:id", productosController.getById);
router.post("/create", productosController.create);
router.put("/:id", productosController.update);
// falta delete

// OTROS
router.get("/destacados", productosController.getDestacados);   // destacados
router.get("/precio/:min/:max", productosController.getByPrice);     // por precio
router.get("/categoria/:id", productosController.getByCategory);     // por categoria


//console.log(req.params.id); // cuando enviamos el JSON por parametro /id
//console.log(req.query); // cuando enviamos el JSON via query string /?buscar=sarasa
//console.log(req.body);  //cuando enviamos el JSON via body

module.exports = router;
