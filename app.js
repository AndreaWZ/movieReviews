const express = require("express"),
      app     = express(),
      request = require("request");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    const url = "https://api.themoviedb.org/3/movie/upcoming?api_key=b4bf14820185df41ad677a7daef76b12&language=en-US&page=1"
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
        const data = JSON.parse(body);
        res.render("main", {data: data});
        };
    });
});

app.get("/results", function(req, res){
    const query = req.query.search;
	const url = "https://api.themoviedb.org/3/search/movie?api_key=b4bf14820185df41ad677a7daef76b12&language=en-US&query=" + query
	
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			const data = JSON.parse(body);
            res.render("results", {data: data});
		};
	});
})

app.get("/reviews/:id", function(req, res){
    const movieId = req.params.id
    const url = "https://api.themoviedb.org/3/movie/" + movieId + "/reviews?api_key=b4bf14820185df41ad677a7daef76b12"

    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            const info = JSON.parse(body);
            // console.log("this is from data: " + info + " end here!! ");
            res.render("reviews", {info: info});
        }
    });
});

app.listen(3000, function(){
    console.log("Server Started!!!");
});

