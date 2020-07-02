var ventaModel = require("../models/ventaModel");
var usuarioModel = require("../models/usuarioModel");
var productoModel = require("../models/productoModel");

module.exports = {
	// TRAER TODO
	getAll: async function (req, res, next) {

		try {
			let ventas = await ventaModel.find({}); 
			await usuarioModel.populate(ventas, { path: "usuario" }); //ventas es la coleccion y el path el campo que la relaciona
			await productoModel.populate(ventas, { path: "productos" });

			res.status(200).json(ventas);
			console.log(ventas);
			
		} catch (error) {
			res.json("Se ha producido un error: " + error);
			console.log("Se ha producido un error: " + error);
		}
	},

	getAllPaginate: async function (req, res, next) {

		try {
			let ventas = await ventaModel.paginate({},{
				populate:['usuario', 'productos'],
				limit: 5,
				sort:{fecha:-1},
				page:(req.query.page?req.query.page:1)
			});

			res.status(200).json(ventas);
			console.log(ventas);
			
		} catch (error) {
			res.json("Se ha producido un error: " + error);
			console.log("Se ha producido un error: " + error);
		}
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

	// ACTUALIZAR
	update: async function (req, res, next) {
		try {
			let data = await ventaModel.findByIdAndUpdate(req.params.id, req.body);
			res.status(201).json({
				status: "success",
				message: "Se actualizo correctamente",
				data: data,
			});
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	},
	
	// ELIMINAR
	delete: async function (req, res, next) {
		try {
			let data = await ventaModel.findByIdAndDelete(req.params.id);
			res.status(201).json({
				status: "success",
				message: "Se eliminó correctamente",
				data: data,
			});
			console.log(data);
		} catch (error) {
			console.log("Ocurrió un error: " + error);
		}
	},



};
