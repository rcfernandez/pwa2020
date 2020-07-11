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
const { Server } = require("http");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.set("secretKey", "pwa2020");

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
app.use("/", indexRouter); // omitimos porque esta pensado para hacer web
//app.use('/users', usersRouter);
app.use("/productos", productosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/ventas", ventasRouter);
app.use("/categorias", categoriasRouter);
app.use("/upload", uploadRouter);

// VALIDAR USUARIO
function validateUser(req, res, next) {
	jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (err, decoded) {
		if (err) {
			res.json({ message: err.message });
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
