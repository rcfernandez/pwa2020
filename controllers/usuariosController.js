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
			console.log('Usuarios mostrados correctamente: ', data);

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
			console.log('Usuarios paginados mostrados correctamente: ', usuarios);

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

			res.status(201).json({
				status: "success",
				message: "Usuario creado correctamente",
				data: data,
			});

			console.log(`Usuario creado correctamente: ${data}`);

		} catch (error) {
			res.json(error);
			console.log(`Ha ocurrido un error al crear el Usuario: ${error}`);
		}
	},

	update: async function (req, res, next) {
		try {
			let data = await usuarioModel.findByIdAndUpdate(req.params.id, req.body);
			res.status(201).json({
				status: "success",
				message: "El usuario se actualizo correctamente",
				data: data,
			});
			console.log(`Usuario actualizado correctamente: ${data}`);

		} catch (error) {
			console.log(`Ha ocurrido un error al actualizar: ${error}`);
		}
	},

	delete: async function (req, res, next) {
		try {
			let data = await usuarioModel.findByIdAndDelete(req.params.id);
			res.status(201).json({
				status: "success",
				message: "Se eliminó correctamente",
				data: data,
			});
			console.log(`Usuario eliminado correctamente: ${data}`);

		} catch (error) {
			console.log(`Ha ocurrido un error al borrar: ${error}`);
		}
	},

	// LOGUEAR USUARIO
	login: async function (req, res, next) {
		let usuarioBuscado = await usuarioModel.findOne({
			usuario: req.body.usuario,
		}); // aca va findOne
		console.log(usuarioBuscado);

		if (usuarioBuscado) {
			//Validar el password
			if (bcrypt.compareSync(req.body.contraseña, usuarioBuscado.contraseña)) {
				//Password valido , genero token
				const token = jwt.sign({ usuario: usuarioBuscado }, req.app.get("secretKey"), { expiresIn: "1h" });
				res.status(201).json({ token: token });
			} else {
				//Password invalido
				res.json({ message: "Password incorrecto", data: null });
			}
		} else {
			//Arrojar error
			res.json({ message: "Usuario no existe", data: null });
		}
	},

	// POST login-admin

	// POST registro-admin
};
