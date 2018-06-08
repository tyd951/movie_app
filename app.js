var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("public"));

var port = process.env.PORT || 8080;

app.get("/",function(req,res){
    res.render("search");
});

app.get("/results",function(req,res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s="+query+"&apikey=thewdb";
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            console.log(data["Search"]);
            if(data["Search"]){
                res.render("results",{data:data});
            }
            else{
                res.render("noresult");
            }
        }

    });
});


app.listen(port,function(){
    console.log("Movie app has started!");
});