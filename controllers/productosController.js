var productoModel = require('../models/productoModel');
var categoriaModel = require('../models/categoriaModel');

// upload image
var multer = require('multer');
var DIR = './public/images/productos/';
var upload = multer({ dest: DIR }).single('photo');

module.exports = {

	// TRAER TODO
	getAll: async function (req, res, next) {
		try {

			let productos = await productoModel.find({});
			await categoriaModel.populate(productos, { path: 'categoria' });

			res.status(200).json({
				status: 'success',
				message: 'Se han traido exitosamente el listado de productos',
				data: productos
			});
			console.log('Se han traido exitosamente el listado de productos');

		} catch (error) {
			res.json({
				status: 'error',
				message: 'Se produjo un error al mostrar el listado de productos',
				data: null
			});
			console.log('Se produjo un error al mostrar el listado de productos', error.message);
			next();
		}
	},

	getAllPaginate: async function (req, res, next) {
		try {
			let productos = await productoModel.paginate({},
				{
					//select: '' ,
					populate: 'categoria',
					limit: 10,
					// sort: { nombre: 1 },
					page: req.query.page ? req.query.page : 1,
				}
			);

			if(productos){
				res.status(200).json({
					status: 'success',
					message: 'Se han traido exitosamente el listado paginado de productos',
					data: productos
				});
				console.log('\nSe han traido exitosamente el listado paginado de productos');

			} else {
				res.json({
					status: 'notFound',
					message: 'No se ha encontrado listado paginado de productos',
					data: null
				});
				console.log('\nSe han traido exitosamente el listado paginado de productos');
			}

		} catch (error) {
			res.json({
				status: 'error',
				message: 'Se ha producido un error al traer el listado paginado de productos',
				data: null
			});
			console.log('\nSe ha producido un error al traer el listado paginado de productos', error.message);
			next();
		}
	},

	// TRAER POR ID
	getById: async function (req, res, next) {
		try {
			let data = await productoModel.findById(req.params.id);

			if(data){
				res.status(200).json({
					status: 'success',
					message: 'Se trajo el producto por ID correctamente',
					data: data
				});
				console.log('\nSe trajo el producto por ID correctamente');

			} else {
				res.json({
					status: 'unsuccess',
					message: 'No se pudo traer el producto por ID',
					data: null
				});
				console.log('\nNo se pudo traer el producto por ID');
			}

		} catch (error) {
			res.json({
				status: 'error',
				message: 'Se ha producido un error al traer el producto por ID',
				data: null
			});
			console.log('\nSe ha producido un error al traer el producto por ID', error.message);
			next();
		}
	},

	// CREAR
	create: async function (req, res, next) {

		// si no se carga imagen se coloca esta por default
		let defaultImage = {
			destination: "./public/images/productos/",
			encoding: "7bit",
			fieldname: "photo",
			filename: "placeholder-image.png",
			mimetype: "image/jpeg",
			originalname: "placeholder-image.png",
			path: "public\\images\\productos\\placeholder-image.png",
		}

		//si no se carga categoria se coloca este por default que es SIN Categoria
		let defaultCategoria = {
			_id: "5efe30434fd19b3b50c641e6",
			descripcion: "Sin Categoria"
		}

		let producto = new productoModel({
			nombre: req.body.nombre,
			descripcion: req.body.descripcion,
			sku: req.body.sku ? req.body.sku : "n/c",
			categoria: req.body.categoria ? req.body.categoria : defaultCategoria,
			precio: req.body.precio ? req.body.precio : 0,
			oferta: req.body.oferta ? req.body.oferta : 0,
			cantidad: req.body.cantidad ? req.body.cantidad : 0,
			destacado: req.body.destacado ? req.body.destacado : 0,
			imagen: req.body.imagen ? req.body.imagen : defaultImage,
		});

		try {
			let data = await producto.save();

			if(data){
				res.status(200).json({
					status: 'success',
					message: 'Se creo el producto correctamente',
					data: data
				});
				console.log('\nSe creo el producto correctamente');

			} else {
				res.json({
					status: 'unsuccess',
					message: 'No se pudo crear el producto',
					data: null
				});
				console.log('\nNo se pudo crear el producto');
			}

		} catch (error) {
			res.json({
				status: 'error',
				message: 'Se ha producido un error al crear el producto',
				data: null
			});
			console.log('\nSe ha producido un error al crear el producto', error.message);
			next();
		}
	},

	// ACTUALIZAR
	update: async function (req, res, next) {
		try {
			let data = await productoModel.findByIdAndUpdate(req.params.id, req.body);

			if(data){
				res.status(200).json({
					status: 'success',
					message: 'Se modifico el producto correctamente',
					data: data
				});
				console.log('\nSe modifico el producto correctamente');

			} else {
				res.json({
					status: 'unsuccess',
					message: 'No se pudo modificar el producto',
					data: null
				});
				console.log('\nNo se pudo modificar el producto');
			}

		} catch (error) {
			res.json({
				status: 'error',
				message: 'Se ha producido un error al modificar el producto',
				data: null
			});
			console.log('\nSe ha producido un error al modificar el producto', error.message);
			next();
		}
	},

	// DELETE productos/
	delete: async function (req, res, next) {
		try {
			let data = await productoModel.findByIdAndDelete(req.params.id);
			
			if(data){
				res.status(200).json({
					status: 'success',
					message: 'Se eliminó el producto correctamente',
					data: data
				});
				console.log('\nSe eliminó el producto correctamente');

			} else {
				res.json({
					status: 'unsuccess',
					message: 'No se pudo eliminar el producto',
					data: null
				});
				console.log('\nNo se pudo eliminar el producto');
			}

		} catch (error) {
			res.json({
				status: 'error',
				message: 'Se ha producido un error al eliminar el producto',
				data: null
			});
			console.log('\nSe ha producido un error al eliminar el producto', error.message);
			next();
		}
	},

	// GET productos/destacados/
	getDestacados: async function (req, res, next) {
		try {
			let productos = await productoModel.find({ destacado: 1 });
			await categoriaModel.populate(productos, { path: 'categoria' });

			if(productos){
				res.status(200).json({
					status: 'success',
					message: 'Se trajeron los productos destacados correctamente',
					data: productos
				});
				console.log('\nSe trajeron los productos destacados correctamente');

			} else {
				res.json({
					status: 'unsuccess',
					message: 'No se pudo traer los productos destacados',
					data: null
				});
				console.log('\nNo se pudo traer los productos destacados');
			}

		} catch (error) {
			res.json({
				status: 'error',
				message: 'Se ha producido un error al traer los productos destacados',
				data: null
			});
			console.log('\nSe ha producido un error al traer los productos destacados', error.message);
			next();
		}
	},

	// GET productos/buscar/query?nombre=celular&min=100&max=5000&categoria=tecnologia
	getByQuery: async function (req, res, next) {
		try {

			let nombre = req.query.buscador !== 'null' ? req.query.buscador : ''
			let min = req.query.minimo !== 'null' ? req.query.minimo : '' 
			let max = req.query.maximo !=='null' ? req.query.maximo : ''
			let categoria = (req.query.categoria !== 'null' && req.query.categoria !== 'all') ? req.query.categoria : ''

			let query = {};

			if(nombre) {
				query.nombre = new RegExp(nombre,'i')	// si ingreso nombre
			}


			if(min && !max) {	// si solo ingreso un precio minimo
				query.precio = { $gte : min }
			} else {
				if(!min && max){	// si solo ingreso un precio maximo
					query.precio = { $lte : max }
				} else {
					if(min && max){		// si ingreso minimo y maximo
						query.precio = { $gte : min, $lte : max } 
					}
				}
			}

			/* ACLARACION: falta filtrar por precio de oferta*/

			if(categoria){
				query.categoria = categoria	// si ingreso categoria
			}

			let productosEncontrados = await productoModel.find(query)
			await categoriaModel.populate(productosEncontrados, { path: 'categoria' });

			if (productosEncontrados.length > 0) {
				res.status(200).json({
					status: 200,
					message: 'Se encontraron productos: ',
					data: productosEncontrados,
				});

			} else {
				res.json({
					status: 'unsuccess',
					message: 'No se encontraron productos con esos parametros de busqueda',
					data: null,
				});
				console.log('\nNo se encontraron productos con esos parametros de busqueda');
			}
			// si da error
		} catch (error) {
			res.json({
				status: 'error',
				message: 'Ha ocurrido un error en la busqueda',
				data: null,
			});
			console.log('\nHa ocurrido un error en la busqueda: ' + error.message);
		}
	},

	// productos/categoria/:id
	getByCategory: async function (req, res, next) {
		try {

			let productosEncontrados = await productoModel.find({}).where('categoria', req.params.id);
			await categoriaModel.populate(productosEncontrados, { path: 'categoria' });

			if (productosEncontrados != '') {
				console.log('Se encontraron productos: ', productosEncontrados);
				res.status(200).json({
					status: 200,
					message: 'Se encontraron productos',
					data: productosEncontrados,
				});

			} else {
				console.log('No se encontraron productos con esa de esa categoria');
				res.status(200).json({
					status: 200,
					message: 'No se encontraron productos con esa categoria',
					data: null,
				});
			}

		} catch (error) {
			res.json({
				status: 'error',
				message: 'Ha ocurrido un error',
				data: null,
			});
			console.log('\nHa ocurrido un error: ' + error.message);
		}
	},

	upload: async function (req, res, next) {
		try {
			var path = '';

			upload(req, res, function (err) {
				// An error occurred when uploading
				if (err) {
					console.log('Ocurrio un error en metodo upload: ', err);
					next();
				}
				// No error occured.
				path = req.file.path;
				console.log("req.file.path: ", req.file.path);
				
				res.status(201).json({
					status: 'success',
					message: 'Imagen cargada exitosamente',
					data: req.file,
				});

			});
			
		} catch (error) {
			console.log('Ocurrio un error al subir la imagen ', error);
			res.json({
				status: 'error',
				message: 'Ocurrio un error al subir la imagen: ',
				data: error
			});
			next(error);
		}
	}



};
