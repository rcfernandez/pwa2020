var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require("jsonwebtoken");
const cors = require('cors');

// llama a la ruta en otra carpeta
var indexRouter = require("./routes/index");
var productosRouter = require("./routes/productos");
var usuariosRouter = require("./routes/usuarios");
var ventasRouter = require("./routes/ventas");
var categoriasRouter = require("./routes/categorias");
var uploadRouter = require("./routes/upload");
var authRouter = require("./routes/auth");
var catalogoRouter = require("./routes/catalogo");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.set("secretKey", "pwa2020");	//clave privada para desencriptar 

app.use(cors({
	origin: "http://localhost:4200", 
	credentials:true
	}
));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


//aca se pregunta la ruta primero
app.use("/", indexRouter);
app.use("/usuarios",validateToken, usuariosRouter);
app.use("/categorias",validateToken, categoriasRouter);
app.use("/productos", productosRouter); // esta validado en routes
app.use("/ventas",validateToken, ventasRouter);

app.use("/upload", uploadRouter); // no validado, no toma token
app.use("/auth", authRouter);
// app.use("/checkout/:id");
app.use("/catalogo", catalogoRouter);


// VALIDAR USUARIO
function validateToken(req, res, next) {
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



// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
