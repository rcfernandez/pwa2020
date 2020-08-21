var ventaModel = require("../models/ventaModel");
var usuarioModel = require("../models/usuarioModel");
var productoModel = require("../models/productoModel");
const { defaultConfiguration } = require("../app");

module.exports = {
	// TRAER TODO
	getAll: async function (req, res, next) {

		try {
			let ventas = await ventaModel.find({}); 

			if(ventas) {
				res.status(200).json({
					status:"success",
					message: "Se trajeron todas las ventas con exito",
					data: ventas
				})
				console.log("\nSe trajeron todas las ventas con exito");
			} else {
				res.json({
					status:"unsuccess",
					message: "No se pudo traer el listado de todas las ventas",
					data: null
				})
				console.log("\nNo se pudo traer el listado de todas las ventas");
			}
			
		} catch (error) {
			res.json({
				status:"error",
				message: "Se produjo un error al traer el listado de todas las ventas",
				data: null
			})
			console.log("\nSe produjo un error al traer el listado de todas las ventas");
		}
	},

	getSalesByUser: async function (req, res, next) {

		try {

			let sales = await ventaModel.paginate({
				'usuario._id': req.params.id
			},
			{
				page: req.query.page ? req.query.page : 1,
				limit: req.query.limit ? req.query.limit : 5,
				sort: { fecha: 'desc' }
			})
			
			if(sales){
				res.status(200).json({
					status:"success",
					message: "Se trajeron las compras del usuario con exito",
					data: sales
				})
				console.log("\nSe trajeron las compras del usuario con exito");
			
			} else {
				res.json({
					status:"unsuccess",
					message: "No se encontraron compras para mostrar",
					data: null
				})
				console.log("\nNo se encontraron compras para mostrar");	
			}

		} catch (error) {
			res.json({
				status: "error",
				message: "Ocurrio un error al traer las compras del usuario",
				data: null,
			});
			console.log('\nOcurrio un error al traer las compras del usuario: ', error.message);
		}
	},

	getAllPaginate: async function (req, res, next) {

		try {
			let data = await ventaModel.paginate({},{
				// populate:['usuario', 'productos'],
				limit: 10,
				// sort:{fecha:-1},
				page:( req.query.page ? req.query.page : 1 )
			});

			res.status(200).json({
				status: "success",
				message: "Listado de ventas paginados mostrados correctamente",
				data: data
			});
			console.log('Listado de categorias paginados mostrados correctamente: ');
			
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

		try {
			let venta = new ventaModel({
				fecha: req.body.fecha,
				usuario: req.body.usuario,
				producto: req.body.producto,
				cantidad: req.body.cantidad,
				total: req.body.total,
				medio: req.body.medio,
				estado: req.body.estado,
			});

			let data = await venta.save();

			res.status(201).json({ 
				status: "ok", 
				message: "La compra se realizo correctamente",
				data: data 
			});
			console.log("La compra se realizo correctamente", data);

		} catch (error) {
			res.json({ 
				status: 'error',
				message: 'Error al cargar la compra',
				data: null
			});
			console.log('Ocurrio un error al crear los datos: ', error.message);
		}
	},

	update: async function (req, res, next) {

		delete req.body.usuario;
		delete req.body.producto;

		try {

			let data = await ventaModel.findByIdAndUpdate(req.params.id, req.body);

			if(data){
				res.status(201).json({
					status: "success",
					message: "Los datos se han actualizado correctamente",
					data: data,
				});
				console.log('Los datos se han actualizado correctamente: ', data);
			}

			res.json({
				status: "notFound",
				message: "No se ha encontrado la venta para su modificación",
				data: null,
			});
			console.log('No se ha encontrado la venta para su modificación: ');


		} catch (error) {
			res.json({
				status: "error",
				message: `Ocurrio un error al actualizar los productos`,
				data: null,
			});
			console.log('Ocurrio un error al actualizar los datos: ', error.message);
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
