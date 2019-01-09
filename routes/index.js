var express = require("express");
var app = express();
var request = require("request");

app.get("/", function(req, res){
	res.render("search");
});

// app.get("/results", function(req, res){
// 	var query = req.query.search;
// 	var pages = req.query.page;
// 	var url = "http://www.omdbapi.com/?s=" + query + "&page=" + pages + "&apikey=58d3b80b";

// 	request(url, function(error, response, body){
// 		if (!error && response.statusCode == 200)
// 		{
// 			console.log(body);
// 			var data = JSON.parse(body);
// 			res.render("results", {data: data});
// 		} else {
// 			console.log(err);
// 		}
// 	});
// });

app.get("/movie/:id", function(req, res){
	var movieID = req.params.id;
	// console.log(movieID);
	var url = "http://www.omdbapi.com/?i=" + movieID + "&apikey=58d3b80b";

	request(url, function(error, response, body){
		if (!error && response.statusCode == 200)
		{
			var data = JSON.parse(body);
			res.render("movie", {data: data});
		} else {
			console.log(err);
		}
	});
});

module.exports = app;