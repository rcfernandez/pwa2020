var usuarioModel = require("../models/usuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {


    // LOGUEAR USUARIO
	login: async function (req, res, next) {
		try {
			let usuarioBuscado = await usuarioModel.findOne({ usuario: req.body.usuario }); // aca va findOne

			if (usuarioBuscado) {
				//Validar el password
				if (bcrypt.compareSync(req.body.password, usuarioBuscado.password)) {
					
					//Password valido , genero token
					// const token = jwt.sign({ idUsuario: usuarioBuscado.id, rolUsuario: usuarioBuscado.rol }, req.app.get("secretKey"), { expiresIn: "1h" });
					const token = jwt.sign({ usuario: usuarioBuscado }, req.app.get("secretKey"), { expiresIn: "1h" });

					res.status(201).json({ 
						status: 201,
						message: "Ha ingresado correctamente",
						token: token
					});
					console.log("Se genero el Token correctamente");
				
				} else {
					//Password invalido
					res.json({ 
						status: 204,
						message: "Usuario o contraseña incorrecta", 
						data: null 
					});
					console.log("Contraseña incorrecta");

				}

			} else {
				// si no existe el usuario
				res.json({ 
					status: 204,
					message: "Usuario o contraseña incorrecta", 
					data: null 
				});
				console.log("Usuario no existe");

			}
				
		} catch (error) {
			console.log(`Ocurrido un error al loguearse: ${error.message}`);
		}
		
	},

	register: async function (req, res, next) {

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
			let usuarioBuscado = await usuarioModel.findOne({ usuario : req.body.usuario })
			let emailBuscado = await usuarioModel.findOne({ email : req.body.email });

			if(usuarioBuscado || emailBuscado){

				if(usuarioBuscado){
					res.json({
						status: 204,
						message: "El nombre de usuario ya existe",
						data: null,
					});
					console.log("El usuario ya existe");

				} else {
					res.json({
						status: 204,
						message: "El email ya existe",
						data: null,
					});
					console.log("El email ya existe");
				}

			} else {

				let usuario = new usuarioModel({
					nombre: req.body.nombre,
					apellido: req.body.apellido,
					usuario: req.body.usuario,
					email: req.body.email,
					telefono: '',
					password: req.body.password,
					imagen: req.body.imagen ? req.body.imagen : defaultImage,
					rol: 0,
				});

				let data = await usuario.save();
	
				res.status(200).json({
					status: "success",
					message: "El usuario se ha creado correctamente",
					data: data,
				});
				
				console.log(`Usuario creado correctamente: ${data}`);
			}

		} catch (error) {
			res.json(error.message);
			console.log(`Ha ocurrido un error al crear el Usuario: ${error.message}`);
		}
	},

	checkUsername: async function (req, res, next) {
		try {
			let data = false;
			let message = ''
			let usuario = await usuarioModel.findOne({ usuario : req.params.name });

			if(usuario){
				data = true,
				message = 'El nombre de usuario ya existe'
			} else {
				data = false,
				message = 'El nombre de usuario no existe en la BD'
			}

			res.status(200).json({
				status:"Success",
				message: message,
				data: data
			})
			
		} catch (error) {
			console.log(error.message);
		}
	},

	// VALIDAR USUARIO
	validateToken(req, res, next) {
		jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (err, decoded) {
			// si no esta el token
			if (err) {
				res.status(401).json({ 
					status: "No tienes token",
					message: err.message 
				});
			// si el token es correcto
			} else {
				debugger
				console.log("DECODED::",decoded);
				req.body.userToken = decoded;
				next();
			}
		});
	}



} // module.exports