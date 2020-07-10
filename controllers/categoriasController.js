var categoriaModel = require("../models/categoriaModel");

module.exports = {
	// TRAER TODO
	getAll: async function (req, res, next) {
		try {
			let categorias = await categoriaModel.find({});

			res.status(200).json(categorias);
			console.log(categorias);
		} catch (error) {
			console.log("Se ha producido un error en GETALL: ", error);
		}
	},

	getAllPaginate: async function (req, res, next) {
		try {
			let categorias = await categoriaModel.paginate(
				{},
				{
					limit: 5,
					sort: { descripcion: 1 },
					page: req.query.page ? req.query.page : 1,
				}
			);

			res.status(200).json(categorias);
			console.log(categorias);
		} catch (error) {
			console.log(error);
		}
	},

	// TRAER POR ID
	getById: async function (req, res, next) {
		let categoria = await categoriaModel.findById(req.params.id);
		console.log(categoria);
		res.status(200).json(categoria);
	},

	// CREAR
	create: async function (req, res, next) {
		try {
			var categoria = new categoriaModel({
				descripcion: req.body.descripcion,
				//subcategorias: req.body.subcategorias
			});

			let data = await categoria.save();

			res.status(200).json({
				status: "success Category Created",
				message: "Categoria creada satisfactoriamente",
				data: data,
			});
			console.log("Data: ", data);
		} catch (error) {
			console.log("Ocurrio un error al crear Categoria: ", error);
		}
	},

	// ACTUALIZAR
	update: async function (req, res, next) {
		try {
			let data = await categoriaModel.findByIdAndUpdate(
				req.params.id,
				req.body
			);
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

	// SUBCATEGORIA ////////////////////////////////////

	createSubcategory: async function (req, res, next) {
		try {

			console.log("Que llega a req.param.id: ", req.params.id);
			console.log("Que llega a req.body: ", req.body);

			let categoria = await categoriaModel.findById(req.params.id);
			delete req.body["_id"];
			categoria.subcategorias.push(req.body);
			let data = await categoria.save();

			console.log("req.body", req.body);

			res.status(200).json({
				status: "success Category Created",
				message: "Subcategoria creada satisfactoriamente",
				data: data,
			});
			console.log("Data: ", data);
		} catch (error) {
			res.status(200).json({
				status: "Ocurrio un error",
				message: "Error al crear la Subcategoria",
				data: error,
			});
			console.log("Ocurrio un error al crear la Subcategoria: ", error);
		}
	},

	deleteSubcategory: async function (req, res, next) {
		console.log("Que llega a req.param.id: ", req.params.id);
		console.log("Que llega a req.body: ", req.body);

		let body = {
			_id : req.body._id,
			descripcion : req.body.descripcion
		}

		console.log("BODY: ", body);

		
		try {
			let categoria = await categoriaModel.findById(req.params.id)
			categoria.subcategorias.pull(req.body._id)
			let data = await categoria.save();

			res.status(201).json({
				status: "success",
				message: "Se eliminó la categoria correctamente",
				data: data,
			});

			console.log(data);

		} catch (error) {
			res.status(201).json({
				status: "success",
				message: "(CATCH) Ocurrio un error al eliminar la Subcategoria",
				data: error,
			});

			console.log("Ocurrió un error: " + error);
		}
	},

	updateSubcategory: async function (req, res, next) {
		try {
			// let data = await categoriaModel.findByIdAndUpdate(
			// 	req.params.id,
			// 	req.body
			// );

			let categoria = await categoriaModel.findById(req.params.id);
			//delete req.body["_id"];
			categoria.subcategorias.update(req.body);
			let data = await categoria.save();

			console.log("req.body", req.body);

			res.status(201).json({
				status: "success",
				message: "Se actualizo la subcategoria correctamente",
				data: data,
			});

			console.log(data);

		} catch (error) {
			res.status(201).json({
				status: "Ocurrio un error",
				message: "Error al modificar la Subcategoria",
				data: error,
			});
			console.log("Ocurrio un error al modificar la Subcategoria: ", error);
		}
	},

	getSubcategory: async function (req, res, next) {
		try {
			let subcategorias = await categoriaModel
				.findById(req.params.id)
				.select("subcategorias");

			res.status(200).json(subcategorias);
			console.log("Subcategorias: ", subcategorias);
		} catch (error) {
			console.log(error);
		}
	},
}; // fin module.exports
