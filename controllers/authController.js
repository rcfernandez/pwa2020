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
					const token = jwt.sign({ idUsuario: usuarioBuscado.id }, req.app.get("secretKey"), { expiresIn: "1h" });

					res.status(201).json({ 
						status: 201,
						message: "Ingreso correcto",
						token: token,
						userId: usuarioBuscado.id,
					});
					console.log("Ingreso correcto");
				
				} else {
					//Password invalido
					res.json({ 
						status: 204,
						message: "Password incorrecto", 
						data: null 
					});
					console.log("Password incorrecto");

				}

			} else {
				// si no existe el usuario
				res.json({ 
					status: 204,
					message: "Usuario no existe", 
					data: null 
				});
				console.log("Usuario no existe");

			}
				
		} catch (error) {
			console.log(`Ocurrido un error al loguearse: ${error}`);
		}
		
	},

	// VALIDAR USUARIO
	validateToken(req, res, next) {
		jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (err, decoded) {
			// si no esta el token
			if (err) {
				res.status(401).json({ 
					message: err.message 
				});
			// si el token es correcto
			} else {
				console.log(decoded);
				req.body.userToken = decoded;
				next();
			}
		});
	}



} // module.exports