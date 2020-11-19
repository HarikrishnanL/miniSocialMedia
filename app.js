var express = require("express");
// var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
 // var indexRouter = require("./routes/index");
 var apiRouter = require("./routes/api");
// var apiResponse = require("./helpers/apiResponse");
const config = require("../socialMedia/helpers/config");
var cors = require("cors");
let dbMysql = require("./config/database-connection");
let redisClient = require("./config/redis-connection");
let port = 6000;

// DB connection
var mongoose = require("mongoose");

mongoose.connect(config.MONGO_DB_CONFIG.TEST, { useNewUrlParser: true, useUnifiedTopology: true, dbName:"media" },(err,connect)=>{
	if(err){
		console.log("error ",err);
	}
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var app = express();

//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(express.json());
app.use('/uploads',express.static('uploads'))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
// app.use("/", indexRouter);
app.use("/api/", apiRouter);

// throw 404 if URL not found
// app.all("*", function(req, res) {
// 	return apiResponse.notFoundResponse(res, "Page not found");
// });

// app.use((err, req, res) => {
// 	if(err.name == "UnauthorizedError"){
// 		return apiResponse.unauthorizedResponse(res, err.message);
// 	}
// });

app.get("/",  function (req, res) {
	res.send({
		Service: "Mini social media",
		Status: "RUNNING",
	});
});

app.listen(port,()=>console.log("Mini social media running"));

module.exports = app;
