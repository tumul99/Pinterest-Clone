var express = require('express');
const passport = require('passport');
var router = express.Router();
const localStrategy=require('passport-local');

const userModel = require("./users"); 
//const postModel =require("") // Since it's inside the routes folder

passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {

  res.render('login',{error: req.flash('error')});//here error is and array that returns errors
});
router.get('/feed', function(req, res, next) {
  res.render('feed');
});
router.get("/profile", isLoggedIn, async function(req,res, next){
  const user=await userModel.findOne({// 'user' will contain the details from userModel
    username: req.session.passport.user//fetching username from userModel for to display on profile
  })
  res.render("profile", {user});
});
 

router.post("/register", function(req,res){
  const {username,email,fullname}=req.body;
  const userData= new userModel({username, email, fullname});
  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res, function(){
      res
    })
  
  })
});

router.post("/login", passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash:true//this will return a failure ping
}),function(req,res){

});

router.get("/logout", function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });  
});
function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
return next();
res.redirect("/login")
};
module.exports = router;
