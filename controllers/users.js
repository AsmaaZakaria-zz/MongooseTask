var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var bodyParserMiddleware = bodyParser.urlencoded({extended:false});
var router = express.Router();

// -------------> List all users
router.get("/list", function(req, resp){
  mongoose.model("users").find(function(err, data){
    if(err){
      console.log(err);
    }else{
      resp.render("users/list", {"userData": data})
    }
  })
})


// -------------> add user
router.get("/add", function(req, resp){
    console.log("Add new user");
    resp.render("users/add")
})
router.post("/add", bodyParserMiddleware,function(req, resp){
    var userModel = mongoose.model("users");
    var addUser = new userModel();
    addUser.name = req.body.Name;
    addUser.address = req.body.Address;
    addUser.college = req.body.College;
    addUser.age = req.body.Age;
    addUser.save(function(err){
      if(err){
        console.log("err inser data", err);
      }else{
        console.log("new user added successfully ...");
        resp.redirect("/users/list");
      }
    })
})



//--------------> edit user

router.get("/edit/:Name", function(req, resp){
    console.log("edit user");
    resp.render("users/edit")
})

router.post("/edit", bodyParserMiddleware,function(req, resp){
  var userName = req.body.Name;
  var userAddress = req.body.Address;
  var userCollege = req.body.College;
  var userAge = req.body.Age;

    mongoose.model("users").update({name: userName, address: userAddress, college: userCollege, age: userAge}, function(err, data){
      resp.redirect("/users/list");
    })
})


// -------------> delete user
router.get("/delete/:Name",function(req,resp){
    mongoose.model("users").remove({"name":req.params.Name},function(){
        resp.redirect("/users/list");
        console.log("Done:Deleted!!");
    });
})

// -------------> search for user
router.get("/search", bodyParserMiddleware,function(req, resp){
    var userName = req.body.Name;
    console.log("search for user");
    mongoose.model("users").find({"name": userName},function(err, data){
      resp.render("users/search", {"userData": data})
    })
})
router.post("/search", bodyParserMiddleware,function(req, resp){
    var userName = req.body.Name;
    console.log("search for user");
    mongoose.model("users").find({"name": userName},function(err, data){
      if(err){
        console.log(err);
      }else{
        resp.render("users/search", {"userData": data})
      }
    })
})





module.exports = router;
