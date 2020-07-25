var categoriaModel = require("../models/categoriaModel");

module.exports = {

	getAll: async function (req, res, next) {
		try {
			let data = await categoriaModel.find({});
			res.status(200).json({
				status: "success",
				message: "Listado de usuarios correcto",
				data: data
			});
			console.log('Usuarios mostrados correctamente: ', data);

		} catch (error) {
			console.log('Ocurrio un error al traer listado: ', error);
		}
	},

	getAllPaginate: async function (req, res, next) {
		try {
			let data = await categoriaModel.paginate(
				{},
				{
					limit: 5,
					sort: { descripcion: 1 },
					page: req.query.page ? req.query.page : 1,
				}
			);

			res.status(200).json({
				status: "success",
				message: "Listado de categorias paginados mostrados correctamente",
				data: data
			});
			console.log('Listado de categorias paginados mostrados correctamente: ', data);

		} catch (error) {
			console.log('Ocurrio un error al traer el listado: ', error);
		}
	},

	getById: async function (req, res, next) {
		try {
			let data = await categoriaModel.findById(req.params.id);
			res.status(200).json({
				status: "success",
				message: "Se han mostrados los datos correctamente",
				data: data
			});
			console.log('Se han mostrados los datos correctamente: ', data);

		} catch (error) {
			console.log('Ocurrio un error al traer los datos: ', error);
		}
	},

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
		
		//crear una subcategoria por default si no se carga alguna

		try {
			let categoria = new categoriaModel({
				descripcion: req.body.descripcion,
				imagen: req.body.imagen ? req.body.imagen : defaultImage,
			});

			let data = await categoria.save();

			res.status(200).json({
				status: "Success",
				message: "Datos creados satisfactoriamente",
				data: data,
			});
			console.log('Los datos se han creado correctamente: ', data);

		} catch (error) {
			console.log('Ocurrio un error al crear los datos: ', error);
		}
	},

	update: async function (req, res, next) {
		try {
			let data = await categoriaModel.findByIdAndUpdate(req.params.id,req.body); // aca se puede remplazar

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
			let data = await categoriaModel.findByIdAndDelete(req.params.id);

			res.status(201).json({
				status: "success",
				message: "Se eliminó la categoria correctamente",
				data: data,
			});
			console.log('Los datos se han borrado correctamente: ', data);

		} catch (error) {
			console.log('Ocurrio un error al borrar los datos: ', error);
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
			let categoria = await categoriaModel
				.findOneAndUpdate({ _id: req.params.id, "subcategorias._id": req.body._id },{ "subcategorias.$": req.body });

			console.log("categoria:: ", categoria)
			let data = await categoria.save();

			res.status(201).json({
				status: "success",
				message: "Se actualizo la subcategoria correctamente",
				data: data,
			});

			console.log("Se actualizo la subcategoria correctamente: ", data);

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
			let data = await categoriaModel.findById(req.params.id).select("subcategorias");

			res.status(201).json({
				status: "success",
				message: "Los datos se han mostrado correctamente",
				data: data,
			});
			console.log('Los datos se han mostrado correctamente: ', data);

		} catch (error) {
			console.log('Ocurrio un error al mostrar los datos: ', error);
		}
	},
}; // fin module.exports
