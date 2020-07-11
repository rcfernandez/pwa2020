
// upload image
var multer = require('multer');

module.exports = {

    upload: async function (req, res, next) {
		try {

            var upload = multer({ dest: req.query.path }).single('photo');
            var path = '';
            
			upload(req, res, function (err) {

                // An error occurred when uploading 
				if (err) {
					console.log('Ocurrio un error al subir la imagen: ', err);
					next();
                }
                
				// No error occured.
                path = req.file.path;	
                			
				res.status(201).json({
					status: 'success',
					message: 'Imagen cargada exitosamente',
					data: req.file,
                });
                
				console.log('Se subio la imagen correctamente, REQ.FILE: ', req.file);
			});
			
		} catch (error) {
			console.log('OCURRIO UN ERROR AL SUBIR ARCHIVO ', error);
			res.json({
				status: 'ERROR',
				message: 'OCURRIO UN ERROR AL SUBIR ARCHIVO: ',
				data: error
			});
			next(error);
		}
	},


}