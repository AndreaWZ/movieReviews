const express = require("express"),
      app     = express(),
      request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("main");
});

app.listen(3000, function(){
    console.log("Server Started!!!");
});