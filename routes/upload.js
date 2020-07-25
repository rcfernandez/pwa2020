var express = require("express");
var router = express.Router();

var uploadController = require("../controllers/uploadController");

router.post("/", uploadController.upload);


module.exports = router;