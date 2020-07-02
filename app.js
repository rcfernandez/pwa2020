var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require("jsonwebtoken");
const cors = require('cors');

// llama a la ruta en otra carpeta
var indexRouter = require("./routes/index");
//var usersRouter = require('./routes/users');
var productosRouter = require("./routes/productos");
var usuariosRouter = require("./routes/usuarios");
var ventasRouter = require("./routes/ventas");
var categoriasRouter = require("./routes/categorias");
const { Server } = require("http");

var app = express();



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.set("secretKey", "pwa2020");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
	origin: "http://localhost:4200", 
	credentials:true
	}
  ));

/** HEADER INICIO */
// app.use(function(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
// 	res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
// 	next();
//   });
//   app.options("/*", function(req, res, next){
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
// 	//res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length');
// 	res.send(200);
//   });
  /** HEADER FIN */


//aca se pregunta la ruta primero
app.use("/", indexRouter); // omitimos porque esta pensado para hacer web
//app.use('/users', usersRouter);
app.use("/productos", productosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/ventas", ventasRouter);
app.use("/categorias", categoriasRouter);

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

// habilitar CORS en express: npm install cors --save
// const cors = require('cors');
// app.use(cors());
// app.options('*', cors());

// // Configurar cabeceras y cors
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });


// // Corrige error de CORS
// // Add headers
// app.use(function (req, res, next) {
// 	// Website you wish to allow to connect
// 	res.setHeader('Access-Control-Allow-Origin', '*');

// 	// Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   res.setHeader('Access-Control-Allow-Credentials', true);

// 	// Pass to next layer of middleware
// 	next();
// });

// app.options("/*", function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
// 	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token");
// 	res.send(200);
// });

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
