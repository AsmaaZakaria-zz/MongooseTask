var express = require("express");
var fs = require("fs");
var app = express();

var mongoose = require("mongoose");

var userRoutes=require("./controllers/users")

app.use(express.static('public'));
app.use("/users",userRoutes);
app.set('view engine','ejs')
app.set('views','./views')


mongoose.connect("mongodb://127.0.0.1:27017/dbTask")


var files=fs.readdirSync(__dirname+"/models")
files.forEach(function(file){
  require(__dirname+"/models/"+file);
});

app.get("/", function(req, resp){
  resp.render("home");
})


app.listen(8080, function(){
  console.log("Running server on port 8080 ...");
})
