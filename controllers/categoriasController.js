var categoriaModel = require("../models/categoriaModel");

module.exports = {
	// TRAER TODO
	getAll: async function (req, res, next) {
        let categorias = await categoriaModel.find({});
        console.log(categorias);
		res.status(200).json(categorias);
	},

	// TRAER POR ID
	getById: async function (req, res, next) {
		let categoria = await categoriaModel.findById(req.params.id);
		console.log(categoria);
		res.status(200).json(categoria);
    },
    
    // CREAR
	create: async function (req, res, next) {
		let categoria = await categoriaModel.create({
			descripcion: req.body.descripcion,
		});
		console.log(categoria);
		res.status(201).json(categoria);
    },
    
    // ACTUALIZAR
	update: async function (req, res, next) {
		try {
			let data = await categoriaModel.findByIdAndUpdate(req.params.id, req.body);
			res.status(201).json({
				status: "success",
				message: "Se actualizo la categoria correctamente",
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
			let data = await categoriaModel.findByIdAndDelete(req.params.id);
			res.status(201).json({
				status: "success",
				message: "Se eliminó la categoria correctamente",
				data: data,
			});
			console.log(data);
		} catch (error) {
			console.log("Ocurrió un error: " + error);
		}
    },


}; // fin module.exports
