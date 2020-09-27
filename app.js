const express = require("express"),
      app     = express(),
      request = require("request");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); 

const apiKey = "b4bf14820185df41ad677a7daef76b12";

app.get("/", function(req, res){
    const url = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + apiKey + "&language=en-US&page=1"
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
        const data = JSON.parse(body);
        res.render("main", {data});
        };
    });
});

app.get("/results", function(req, res){
    const query = req.query.search.toLowerCase().trim();
	const url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + query;
    
    if(query !== ""){
        request(url, function(error, response, body){
            if(!error && response.statusCode == 200){
                const data = JSON.parse(body);
                res.render("results", {data});
            };
        });
    } else {
        res.redirect("/");
    }
});

app.get("/reviews/:title/:id/", function(req, res){
    const movieId = req.params.id;
    const movieTitle = req.params.title;
    const url = "https://api.themoviedb.org/3/movie/" + movieId + "/reviews?api_key=" + apiKey;

    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            const info = JSON.parse(body);
            // console.log(info.total_results);
            if(info.total_results !== 0){
                res.render("reviews", {info, movieTitle});
            }
            else {
                res.render("noneReviews", {movieTitle});
            }
        }
    });
});

app.listen(3000, function(){
    console.log("Server Started!!!");
});

