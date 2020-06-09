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

	// CREAR
	create: async function (req, res, next) {
		let producto = new productoModel({
			nombre: req.body.nombre,
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

	// TRAER DESTACADOS
	getDestacados: async function (req, res, next) {
		let productos = await productoModel.find({ destacado: 1 });
		console.log(productos);
		res.status(200).json(productos);
	},

	// delete

	// POR PRECIO MAX MIN
	getByPrice: async function (req, res, next) {
		try {
			let productosEncontrados = await productoModel
				.find({})
				.where("precio")
				.gte(req.params.min)
				.where("precio")
				.lte(req.params.max);

			if (productosEncontrados != "") {
				console.log("Se encontraron productos: ", productosEncontrados);
				res.status(200).json({
					status: 200,
					message: "Se encontraron productos: ",
					data: productosEncontrados,
				});
			} else {
				console.log("no se encontraron productos con ese precio");
				res.status(200).json({
					status: 200,
					message: "no se encontraron productos con ese precio",
					data: null,
				});
			}
			// si da error
		} catch (error) {
			console.log("Ha ocurrido un error: " + error);
		}
	},

	// detalle

	// por categoria
	getByCategory: async function (req, res, next) {
		try {
			let productosEncontrados = await productoModel.find({}).where("categoria", req.params.id);

			if (productosEncontrados != "") {
				console.log("Se encontraron productos: ", productosEncontrados);
				res.status(200).json({
					status: 200,
					message: "Se encontraron productos: ",
					data: productosEncontrados,
				});
			} else {
				console.log("no se encontraron productos con esa de esa categoria");
				res.status(200).json({
					status: 200,
					message: "no se encontraron productos con esa categoria",
					data: null,
				});
			}
			// si da error
		} catch (error) {
			console.log("Ha ocurrido un error: " + error);
		}
	},
};
