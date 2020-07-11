var express = require("express");
var router = express.Router();

const uploadController = require("../controllers/uploadController");

router.post("/", uploadController.upload);

module.exports = router;