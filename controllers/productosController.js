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
			res.status(200).json(productos);
			console.log(productos);
		} catch (error) {
			console.log(error);
			next();
		}
	},

	getAllPaginate: async function (req, res, next) {
		try {
			let productos = await productoModel.paginate(
				{},
				{
					//select: '' ,
					populate: 'categoria',
					limit: 10,
					// sort: { nombre: 1 },
					page: req.query.page ? req.query.page : 1,
				}
			);

			res.status(200).json(productos);
			console.log(productos);

		} catch (error) {
			console.log(error);
			next();
		}
	},

	// TRAER POR ID
	getById: async function (req, res, next) {
		try {
			let producto = await productoModel.findById(req.params.id);
			res.status(200).json(producto);
			console.log(producto);
			
		} catch (error) {
			console.log(`Ha ocurrido un error: ${error}`);
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

		//si no se carga categoria se coloca este por default
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

		console.log('req.body.imagen: ', req.body.imagen, 'req.body.nombre: ', req.body.nombre);

		try {
			let data = await producto.save();
			res.status(201).json({
				status: 'success',
				message: 'El Producto se creo correctamente',
				data: data,
			});

		} catch (error) {
			res.json(error);
			console.log('Create error: ' + error);
		}
	},

	// ACTUALIZAR
	update: async function (req, res, next) {
		try {
			let data = await productoModel.findByIdAndUpdate(req.params.id, req.body);
			res.status(201).json({
				status: 'success',
				message: 'Se actualizo el producto correctamente',
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
			let data = await productoModel.findByIdAndDelete(req.params.id);
			res.status(201).json({
				status: 'success',
				message: 'Se eliminó correctamente',
				data: data,
			});
			console.log(data);

		} catch (error) {
			console.log('Ocurrió un error: ' + error);
		}
	},

	// TRAER DESTACADOS
	getDestacados: async function (req, res, next) {
		try {
			let productos = await productoModel.find({ destacado: 1 });
			await categoriaModel.populate(productos, { path: 'categoria' });
			console.log(productos);
			res.status(200).json(productos);

		} catch (error) {
			console.log(error);
			res.json(error);
		}
	},

	// POR PRECIO MAX MIN
	getByPrice: async function (req, res, next) {
		try {
			let productosEncontrados = await productoModel
				.find({})
				.where('precio')
				.gte(req.params.min)
				.where('precio')
				.lte(req.params.max);

			if (productosEncontrados != '') {
				console.log('Se encontraron productos: ', productosEncontrados);
				res.status(200).json({
					status: 200,
					message: 'Se encontraron productos: ',
					data: productosEncontrados,
				});
			} else {
				console.log('no se encontraron productos con ese precio');
				res.status(200).json({
					status: 200,
					message: 'no se encontraron productos con ese precio',
					data: null,
				});
			}
			// si da error
		} catch (error) {
			console.log('Ha ocurrido un error: ' + error);
		}
	},

	getByCategory: async function (req, res, next) {
		try {
			let productosEncontrados = await productoModel.find({}).where('categoria', req.params.id);

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
			console.log('Ha ocurrido un error: ' + error);
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
				console.log('Se subio la imagen correctamente, REQ.FILE: ', req.file);
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
	},
};
