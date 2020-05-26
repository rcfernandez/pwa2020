var productoModel = require("../models/productoModel");
var categoriaModel = require("../models/categoriaModel");

module.exports = {
	// TRAER TODO
	getAll: async function (req, res, next) {
		let productos = await productoModel.find({});
		await categoriaModel.populate(productos, { path: "categoria" });
		console.log(productos);
		res.status(200).json(productos);
	},

	// TRAER POR ID
	getById: async function (req, res, next) {
		let producto = await productoModel.findById(req.params.id);
		console.log(producto);
		res.status(200).json(producto);
	},

	// TRAER DESTACADOS
	getDestacados: async function (req, res, next) {
		let productos = await productoModel.find({ destacado: 1 });
		console.log(productos);
		res.status(200).json(productos);
	},

	// CREAR
	create: async function (req, res, next) {
		let producto = new productoModel({
			descripcion: req.body.descripcion,
			precio: req.body.precio,
			cantidad: req.body.cantidad,
			categoria: req.body.categoria,
			destacado: req.body.destacado,
		});
		let data = await producto.save();
		res.status(201).json({
			status: "success",
			message: "Se creo el producto correctamente",
			data: data,
		});
	},

	// ACTUALIZAR
	update: async function (req, res, next) {
		try {
			let data = await productoModel.findByIdAndUpdate(req.params.id, req.body);
			res.status(201).json({
				status: "success",
				message: "Se actualizo el producto correctamente",
				data: data,
			});
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	},

	// delete

	// por precio entre max y min

	// detalle

	// por categoria
};
