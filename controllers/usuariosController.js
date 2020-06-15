var usuarioModel = require("../models/usuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
	// TRAER TODOS LOS USUARIOS
	getAll: async function (req, res, next) {
		try {
			let usuarios = await usuarioModel.find({});
			res.status(200).json(usuarios);
			console.log(usuarios);
		} catch (error) {
			console.log(error);
		}
	},

	// TRAER USUARIO POR ID
	getById: async function (req, res, next) {
		try {
			let usuarios = await usuarioModel.findById(req.params.id);
			res.status(200).json(usuarios);
			console.log(usuarios);
			
		} catch (error) {
			console.log(error);
		}
	},

	// (CREAR) REGISTRAR USUARIO
	create: async function (req, res, next) {
		try {
			let usuario = await usuarioModel.create({
				usuario: req.body.usuario,
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				email: req.body.email,
				telefono: req.body.telefono,
				password: req.body.password,
			});
			res.status(201).json(usuario);
			console.log(usuario);
		} catch (error) {
			console.log(error);
		}
	},

	update: async function (req, res, next) {
		try {
			let data = await usuarioModel.findByIdAndUpdate(req.params.id, req.body);
			res.status(201).json({
				status: "success",
				message: "Se actualizo correctamente",
				data: data,
			});
			console.log(data);
		} catch (error) {
			console.log(error);
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
			console.log(data);
		} catch (error) {
			console.log("Ocurrió un error: " + error);
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
