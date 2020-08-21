var categoriaModel = require("../models/categoriaModel");

module.exports = {

	getAll: async function (req, res, next) {
		try {

			let data = await categoriaModel.find({});

			if(data){
				res.status(200).json({
					status: "success",
					message: "Se han traido exitosamente el listado de categorias",
					data: data
				});
				console.log('\nSe han traido exitosamente el listado de categorias');

			} else {
				res.json({
					status: "unsuccess",
					message: "No se ha podido traer el listado de categorias",
					data: null
				});
				console.log("\nNo se ha podido traer el listado de categorias");
			}

		} catch (error) {
			res.json({
				status: "error",
				message: 'Ha ocurrido un error al traer listado de categorias',
				data: null
			});
			console.log('\nHa ocurrido un error al traer listado de categorias: ', error.message);
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

			if(data) {
				res.status(200).json({
					status: "success",
					message: "Listado de categorias paginados mostrados correctamente",
					data: data
				});
				console.log('\nListado de categorias paginados mostrados correctamente: ');
			
			} else {
				res.json({
					status: "unsuccess",
					message: "No se ha podido traer el listado paginado de categorias",
					data: null
				});
				console.log("\nNo se ha podido traer el listado paginado de categorias");
			}

		} catch (error) {
			res.json({
				status: "error",
				message: "No se ha podido traer el listado paginado de categorias",
				data: null
			});
			console.log('\nOcurrio un error al traer el listado paginado de categorias: ', error.message);
		}
	},

	getById: async function (req, res, next) {
		try {
			let data = await categoriaModel.findById(req.params.id);
			
			if(data) {
				res.status(200).json({
					status: "success",
					message: " Se trajo el listado de categorias por ID correctamente",
					data: data
				});
				console.log('\n Se trajo el listado de categorias por ID correctamente');

			} else {
				res.json({
					status: "unsuccess",
					message: "No se pudo traer la categoria por ID",
					data: null
				});
				console.log('\nNo se pudo traer la categoria por ID');
			}

		} catch (error) {
			res.json({
				status: "error",
				message: "Ocurrio un error al traer la categoria por ID",
				data: null,
			});
			console.log('\nOcurrio un error al traer la categoria por ID: ', error.message);
			next();
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

			if(data) {
				res.status(201).json({
					status: "success",
					message: "La categoria se creo correctamente",
					data: data,
				});
				console.log('\nLa categoria se creo correctamente');

			} else {
				res.json({
					status: "unsuccess",
					message: "No se pudo crear la categoria",
					data: null,
				});
				console.log('\nNo se pudo crear la categoria');
			}

		} catch (error) {
			res.json({
				status: "error",
				message: "Ocurrio un error al crear la categoria",
				data: null,
			});
			console.log('\nOcurrio un error al crear la categoria: ', error.message);
		}
	},

	update: async function (req, res, next) {
		try {
			let data = await categoriaModel.findByIdAndUpdate(req.params.id,req.body);

			if(data) {
				res.status(201).json({
					status: "success",
					message: "La categoria se modifico correctamente",
					data: data,
				});
				console.log('\nLa categoria se modifico correctamente');

			} else {
				res.json({
					status: "unsuccess",
					message: "No se pudo modificar la categoria",
					data: null,
				});
				console.log('\nNo se pudo modificar la categoria');
			}

		} catch (error) {
			res.json({
				status: "error",
				message: "Ocurrio un error al modificar la categoria",
				data: null,
			});
			console.log('\nOcurrio un error al modificar la categoria: ', error.message);
		}
	},

	delete: async function (req, res, next) {
		try {
			let data = await categoriaModel.findByIdAndDelete(req.params.id);

			if(data) {
				res.status(201).json({
					status: "success",
					message: "La categoria se elimino correctamente",
					data: data,
				});
				console.log('\nLa categoria se elimino correctamente');
			
			} else {
				res.json({
					status: "unsuccess",
					message: "No se pudo eliminar la categoria",
					data: null,
				});
				console.log('\nNo se pudo eliminar la categoria');
			}

		} catch (error) {
			res.json({
				status: "error",
				message: "Ocurrio un error al eliminar la categoria",
				data: null,
			});
			console.log('\nOcurrio un error al eliminar la categoria: ', error);
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
	}



}; // fin module.exports
