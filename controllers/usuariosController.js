var usuarioModel = require("../models/usuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
	// TRAER TODOS LOS USUARIOS
	getAll: async function (req, res, next) {
		try {
			let data = await usuarioModel.find({});
			res.status(200).json({
				status: "success",
				message: "Listado de usuarios correcto",
				data: data
			});
			console.log('Usuarios mostrados correctamente: ');

		} catch (error) {
			console.log('Ocurrio un error al traer listado: ', error);
		}
	},

	getAllPaginate: async function (req, res, next) {
		try {
			let usuarios = await usuarioModel.paginate(
			{},
			{
				limit: 10,
				//sort: { usuario:1 },
				page: req.query.page ? req.query.page : 1
			});

			res.status(200).json({
				status: "success",
				message: "Listado de usuarios correcto",
				data: usuarios
			});
			console.log('Usuarios paginados mostrados correctamente: ');

		} catch (error) {
			console.log('Ocurrio un error al traer listado paginado: ', error);
		}
	},

	getById: async function (req, res, next) {
		try {
			let usuarios = await usuarioModel.findById(req.params.id);
			res.status(200).json(usuarios);
			console.log(usuarios);
			
		} catch (error) {
			console.log(error);
		}
	},

	create: async function (req, res, next) {

		// si no se carga una imagen
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
			let usuario = new usuarioModel({
				usuario: req.body.usuario,
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				email: req.body.email,
				telefono: req.body.telefono,
				password: req.body.password,
				imagen: req.body.imagen ? req.body.imagen : defaultImage,
				rol: req.body.rol ? req.body.rol : 0,
			});

			let data = await usuario.save();

			if(data) {
				res.status(201).json({
					status: "success",
					message: "Usuario creado correctamente",
					data: data,
				});
				console.log(`\nUsuario creado correctamente`);

			} else {
				res.json({
					status: "unsuccess",
					message: "No se pudo crear el usuario",
					data: null,
				});
				console.log(`\nNo se pudo crear el usuario`);
			}

		} catch (error) {
			res.json({
				status: "error",
				message: "Ocurrio un error al crear el usuario",
				data: null,
			});
			console.log(`\nOcurrio un error al crear el usuario: ${error.message}`);
		}
	},

	update: async function (req, res, next) {
		try {

			let data = await usuarioModel.findByIdAndUpdate(req.params.id, req.body);
			
			if(data) {
				res.status(201).json({
					status: "success",
					message: "Los datos del usuario se modificarion correctamente",
					data: data,
				});
				console.log("\nLos datos del usuario se modificarion correctamente");
			
			} else {
				res.json({
					status: "unsuccess",
					message: "No se pudo modificar los datos del usuario",
					data: null,
				});
				console.log("\nNo se pudo modificar los datos del usuario");
			}

		} catch (error) {
			res.json({
				status: "error",
				message: "Ha ocurrido un error al modificar los datos del usuario",
				data: null,
			});
			console.log(`Ha ocurrido un error al modificar los datos del usuario: ${error.message}`);
		}
	},

	delete: async function (req, res, next) {
		try {
			let data = await usuarioModel.findByIdAndDelete(req.params.id);

			if(data) {
				res.status(201).json({
					status: "success",
					message: "El usuario se eliminó correctamente",
					data: data,
				});
				console.log('\nEl usuario se eliminó correctamente');
			
			} else {
				res.json({
					status: "unsuccess",
					message: "No se pudo eliminar el usuario",
					data: null,
				});
				console.log('\nNo se pudo eliminar el usuario');
			}

		} catch (error) {
			res.json({
				status: "error",
				message: "Se produjo un error al eliminar el usuario",
				data: null,
			});
			console.log(`\nSe produjo un error al eliminar el usuario: ${error}`);
		}
	},

};
