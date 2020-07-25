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
			let data = await ventaModel.paginate({},{
				populate:['usuario', 'productos'],
				limit: 5,
				sort:{fecha:-1},
				page:(req.query.page?req.query.page:1)
			});

			res.status(200).json({
				status: "success",
				message: "Listado de ventas paginados mostrados correctamente",
				data: data
			});
			console.log('Listado de categorias paginados mostrados correctamente: ', data);
			
		} catch (error) {
			res.json("Se ha producido un error: " + error.message);
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

		// imagen default por si no se carga imagen
		let defaultImage = {
			destination: "./public/images/placeholders/",
			encoding: "7bit",
			fieldname: "photo",
			filename: "placeholder-image.png",
			mimetype: "image/png",
			originalname: "placeholder-image.png",
			path: "public\\images\\placeholders\\placeholder-image.png"
		}

		try {

			let venta = new ventaModel({
				fecha: req.body.fecha,
				usuario: req.body.usuario,
				productos: req.body.productos,
				cantidad: req.body.cantidad,
				total: req.body.total,
				medio: req.body.medio,
				estado: req.body.estado,
				imagen: req.body.imagen ? req.body.imagen : defaultImage
			});

			let data = await venta.save();

			res.status(201).json({ 
				status: "ok", 
				message: "Datos creados satisfactoriamente",
				data: data 
			});
			console.log('Los datos se han creado correctamente: ', data);

		} catch (error) {
			res.json({ 
				status: "Error al cargar la Venta", 
				data: error.message 
			});
			console.log('Ocurrio un error al crear los datos: ', error);
		}
	},

	update: async function (req, res, next) {
		try {
			let data = await ventaModel.findByIdAndUpdate(req.params.id, req.body);
			res.status(201).json({
				status: "success",
				message: "Los datos se han actualizado correctamente",
				data: data,
			});
			console.log('Los datos se han actualizado correctamente: ', data);

		} catch (error) {
			console.log('Ocurrio un error al actualizar los datos: ', error);
		}
	},
	
	delete: async function (req, res, next) {
		try {
			let data = await ventaModel.findByIdAndDelete(req.params.id);

			res.status(201).json({
				status: "success",
				message: "La venta se elimino correctamente",
				data: data,
			});
			console.log('Los datos se han borrado correctamente: ', data);

		} catch (error) {
			console.log('Ocurrio un error al borrar los datos: ', error);
		}
	},



};
