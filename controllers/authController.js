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
					const token = jwt.sign({ usuario: usuarioBuscado }, req.app.get("secretKey"), { expiresIn: "6h" });

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
						message: "Usuario y/o contraseña incorrecta", 
						data: null 
					});
					console.log("Contraseña incorrecta");

				}

			} else {
				// si no existe el usuario
				res.json({ 
					status: 204,
					message: "Usuario y/o contraseña incorrecta", 
					data: null 
				});
				console.log("Usuario no existente");
			}
				
		} catch (error) {
			console.log(`Ocurrio un error al loguearse: ${error.message}`);
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

	updateUser: async function (req, res, next) {
		try {

			console.log('\nreq.body: ', req.body);

			if(req.body.password) {
				let passHash = bcrypt.hashSync(req.body.password,10);
				req.body.password = passHash;
				console.log('pass hash: ', req.body.password)
			} else {
				delete req.body.password;
			}

			console.log('req.body: ', req.body);

			let data = await usuarioModel.findByIdAndUpdate(req.body._id, req.body);
			
			if(data) {
				res.status(200).json({
					status: "success",
					message: "Tus datos se han actualizado correctamente",
					// data: data,
				});
				console.log("\nLos datos del usuario se modificaron correctamente");
			
			} else {
				res.json({
					status: "unsuccess",
					message: "No se pudo modificar tus datos",
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

	// VALIDAR ROL USER
	validateToken(req, res, next) {
		jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (err, decoded) {
			// si no esta el token
			if (err) {
				res.status(401).json({ 
					status: "Unauthorized",
					message: err.message,
					data: null
				});
				console.log("\n[ValidateToken] NO HAY TOKEN O CADUCÓ");
			// si el token es correcto
			} else {
				if (decoded.usuario.rol == 0 || decoded.usuario.rol == 1) {
					req.body.userToken = decoded;
					console.log("\n[ValidateToken] TOKEN USUARIO VALIDADO CORRECTAMENTE");
					next();

				} else {
					res.json({
						status: "Unauthorized",
						message: "[ValidateToken] DEBES SER USUARIO LOGUEADO PARA REALIZAR ESTA ACCION"
					})
					console.log("\n[ValidateToken] DEBES SER USUARIO LOGUEADO PARA REALIZAR ESTA ACCION")
				}
			}
		});
	},

	// VALIDAR ROL ADMIN
	validateTokenAdmin(req, res, next) {

		jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (err, decoded) {
			// si no esta el token
			if (err) {
				res.status(401).json({ 
					status: "Unauthorized",
					message: err.message,
					data: null
				});
				console.log("\n[ValidateToken] NO HAY TOKEN");

			// si el token es correcto
			} else {
				if (decoded.usuario.rol == 1) {
					req.body.userToken = decoded;
					console.log("\n[ValidateToken] TOKEN ADMIN VALIDADO CORRECTAMENTE");
					next();

				} else {
					res.json({
						status: "Unauthorized",
						message: "[ValidateToken] DEBES SER ADMIN PARA REALIZAR ESTA ACCIÓN",
						data: null
					})
					console.log("\n[ValidateToken] DEBES SER ADMIN PARA REALIZAR ESTA ACCIÓN")
				}
			}
		});

	}



} // module.exports