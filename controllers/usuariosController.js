var usuarioModel = require("../models/usuarioModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {

	// TRAER TODOS LOS USUARIOS
	getAll: async function (req, res, next) {
		let usuarios = await usuarioModel.find({});
		console.log(usuarios); // esto va a mostrar por postman
		res.status(200).json(usuarios); // esto por consola visual studio
	},

	// TRAER USUARIO POR ID
	getById: async function (req, res, next) {
		let usuarios = await usuarioModel.findById(req.params.id); // arreglar aca el envio si no anda.
		console.log(usuarios);
		res.status(200).json(usuarios);
	},

	// (CREAR) REGISTRAR USUARIO
	create: async function (req, res, next) {
		let usuario = await usuarioModel.create({
			user: req.body.user,
			name: req.body.name,
			pass: req.body.pass,
		});
		console.log(usuario);
		res.status(201).json(usuario);
	},

	// LOGUEAR USUARIO
	login: async function (req, res, next) {

		let usuarioBuscado = await usuarioModel.findOne({ user: req.body.user }); // aca va findOne
		console.log(usuarioBuscado);

		if (usuarioBuscado) {
			
			//Validar el password
			if(bcrypt.compareSync(req.body.pass,usuarioBuscado.pass)){
				
				//Password valido , genero token
				const token = jwt.sign( {usuario:usuarioBuscado},req.app.get('secretKey'),{expiresIn:'1h'} )
				res.status(201).json({token:token})

			} else{
				//Password invalido
				res.json({message:"Password incorrecto", data:null})
			}

		} else {
			//Arrojar error
			res.json({message:"Usuario no existe", data:null})
		}

	},
	
};