var express = require("express");
var router = express.Router();

var productosController = require("../controllers/productosController");

// GET /
router.get("/", productosController.getAll);

// GET /:ID
router.get("/:id", productosController.getById);

// GET /DESTACADOS
router.get("/destacados", productosController.getDestacados);

// POST /CREATE
router.post("/create", productosController.create);

// POST /UPDATE
router.put("/:id", productosController.update);

//console.log(req.params.id); // cuando enviamos el JSON por parametro /id
//console.log(req.query); // cuando enviamos el JSON via query string /?buscar=sarasa
//console.log(req.body);  //cuando enviamos el JSON via body

module.exports = router;
