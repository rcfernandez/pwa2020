var ventaModel = require("../models/ventaModel");
var usuarioModel = require("../models/usuarioModel");
var productoModel = require("../models/productoModel");

module.exports = {
	// TRAER TODO
	getAll: async function (req, res, next) {
		let ventas = await ventaModel.find({}); // trae la coleccion ventas

		// trae las demas colecciones relacionadas
		await usuarioModel.populate(ventas, { path: "usuario" }); //ventas es la coleccion y el path el campo que la relaciona
		await productoModel.populate(ventas, { path: "productos" });

		console.log(ventas);
		res.status(200).json(ventas);
	},

	// TRAER POR ID
	getById: async function (req, res, next) {
		let ventas = await ventasModel.findById(req.params.id);

		console.log(ventas);
		res.status(200).json(ventas);
	},

	// CREAR
	create: async function (req, res, next) {
		let venta = new ventaModel({
			fecha: req.body.fecha,
			usuario: req.body.usuario,
			productos: req.body.productos,
			total: req.body.total,
			estado: req.body.estado,
		});

		try {
			let data = await venta.save();
			res.status(201).json({ status: "ok", data: data });
		} catch (err) {
			res.json({ status: "Error al cargar la Venta", data: err.message });
		}
	},
};
