var compraModel = require("../models/compraModel");
var usuarioModel = require("../models/usuarioModel");
var productoModel = require("../models/productoModel");

module.exports = {
	// TRAER TODO
	getAll: async function (req, res, next) {
		let compras = await compraModel.find({}); // trae la coleccion compras

		// trae las demas colecciones relacionadas
		await usuarioModel.populate(compras, { path: "user" }); //compras es la coleccion y el path el campo que la relaciona
		await productoModel.populate(compras, { path: "products" });

		console.log(compras);
		res.status(200).json(compras);
	},

	// TRAER POR ID
	getById: async function (req, res, next) {
		let compras = await compraModel.findById(req.params.id);

		console.log(compras);
		res.status(200).json(compras);
	},

	// CREAR
	create: async function (req, res, next) {
		let compra = new compraModel({
			date: req.body.date,
			user: req.body.user,
			products: req.body.products,
			total: req.body.total,
			state: req.body.state,
		});

		try {
			let data = await compra.save();
			res.status(201).json({ status: "ok", data: data });
		} catch (err) {
			res.json({ status: "Error al cargar la compra", data: err.message });
		}
	},
};
