var currentPage = 0;
var numOfPages = 0;
var searchLength = 10;
var movies = [];
var currentMovie = [];

$(document).ready(function()
{
	console.log(window.location.href.indexOf("movie"));

	if (window.location.href.indexOf("movie") == -1)
	{
		apiCall(1);		
		document.getElementById("searchInput").focus();
	}
});

$('#searchInput').on("click", function(){
	if (window.location.href.indexOf("movie") > -1)
	{		
		window.location.replace("/");
	}
});

function apiCall(page){
	var query = $('#searchInput').val();
	var year = $('#searchYear').val();
	console.log(query);
	if (query == "")
	{
		query = "lord of the rings";
	}
	movies = [];

	getAllMovies(query, year, page);
}

function getAllMovies(query, year, page)
{
	if (year == "")
	{
			var url = "http://www.omdbapi.com/?s=" + query + "&page=" 
		+ page + "&apikey=58d3b80b";	
	}
	else
	{
		var url = "http://www.omdbapi.com/?s=" + query + "&page=" 
		+ page + "&y=" + year + "&apikey=58d3b80b";		
	}
	console.log(url);
	$.getJSON(url)
	.then(function(response, err){

		if(err != "success")
		{
			console.log(err);
		} 
		else 
		{
			console.log(response);
			var searchLength = response['Search'].length;
			if (searchLength > 50)
			{
				searchLength = 50;
			}

			for(var i = 0; i < searchLength; i++)
			{
				movie = response['Search'][i];
				movies.push(movie);
			}

			page++;
			console.log(searchLength);
			if (searchLength == 10 && page != 11)
			{
				getAllMovies(query, year, page);
			} 
			else
			{
				sortMovies();
				postMovies(movies, 1);
			}
		}
	});
};

function postMovies(movies, currentPage)
{
	numOfPages = Math.floor(movies.length / 10);
	currentPage = 1;

	$("#content > ul > li").remove();
	$(".home-container #content #posters").css("visibility", "visible");
	$(".home-container #list-navigation").css("visibility", "visible");
	for(var i = 0; i < searchLength; i++)
	{
		console.log(movies[i]["Title"]);
		movieName = movies[i]["Title"];
		var movieID = movies[i]['imdbID'];
		var moviePoster = movies[i]["Poster"];

		if (moviePoster == "N/A")
		{
			$("#content #posters:last").append("<li><a href='/movie/" 
				+ movieID + "'</a><img src='https://via.placeholder.com/300x450?text=Poster+not+available' alt='" 
				+ movieName + "'><p>" + movieName + "</p></li>");								
		}
		else
		{
			$("#content #posters:last").append("<li><a href='/movie/" 
				+ movieID + "'</a><img style='min-length: 300px; min-height: 400px' src=" 
				+ moviePoster + " alt='" + movieName + "'><p>" 
				+ movieName + "</p></li>");				
		}
	}
	$("#num-of-pages li").remove();
	for(var i = 0; i < numOfPages; i++)
	{
		$('#num-of-pages').append('<li style="float: left;" class="page-item"><a class="page-link" onclick="showPage(' + (i+1) + ')">' + (i+1) + '</a></li>');
	}
}

function showPage(page)
{
	currentPage = page;
	var resultStart = (page * 10) - 9;
	var searchLength = 10;
	searchLength += resultStart;
	$("#content > ul > li").remove();

	for (resultStart; resultStart < searchLength; resultStart++)
	{
		if (resultStart < movies.length)
		{
		movieName = movies[resultStart]["Title"];
		var movieID = movies[resultStart]['imdbID'];
		var moviePoster = movies[resultStart]["Poster"];

		if (moviePoster == "N/A")
		{
			$("#content #posters:last").append("<li><a href='/movie/" 
				+ movieID + "'</a><img src='https://via.placeholder.com/300x450?text=Poster+not+available' alt='" 
				+ movieName + "'><p>" + movieName + "</p></li>");								
		}
		else
		{
			$("#content #posters:last").append("<li><a href='/movie/" 
				+ movieID + "'</a><img style='min-length: 300px; min-height: 400px' src=" 
				+ moviePoster + " alt='" + movieName + "'><p>" 
				+ movieName + "</p></li>");				
		}
		}
	}
}
function sortMovies(){
	var sortbyYear = $('#sortby-year').val();
	var sortByRating = $('#sortby-rating').val();

	if (sortbyYear == "asc")
	{
	movies.sort((a, b) =>
		parseInt(b.Year) - parseInt(a.Year));
	}
	else if (sortbyYear == "desc")
	{
	movies.sort((a, b) =>
		parseInt(a.Year) - parseInt(b.Year));
	}
};

function setPage(page){

	currentPage += page;
	if (currentPage == 1)
	{
		$('#list-navigation li').addClass("disabled");
	} 
	else
	{
		$('#list-navigation li').removeClass("disabled");
		showPage(currentPage);
	}
}