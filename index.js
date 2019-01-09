const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const indexRoutes = require("./routes/index");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", indexRoutes);

app.listen(process.env.PORT || port, (err) => {
	if (err) {
		console.log("Error", err);
	}
	console.log("You are currently connected to the server.");
});