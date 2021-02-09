
const express  = require("express");
const router   = express.Router();
const passport = require("passport");
const User     = require("../models/user");

router.get("/", function(req, res){
    res.render("home") ;
 }); 
 
 //auth routes
 
router.get("/kayitol", function(req, res){
     res.render("kayitol");
 });
 
router.post("/kayitol", function(req, res){
     let newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
         if(err){
             req.flash("error", "Birşeyler Yanlış Gitti, Yeniden Deneyiniz");
             console.log(err);
             return res.render("kayitol");
         }
         passport.authenticate("local")(req, res, function(){
             req.flash("success", "Bitki Sepeti'ne Hoşgeldiniz " + user.username);
             res.redirect("/bitkiler")
         });
     });
 });
 
router.get("/girisyap", function(req, res){
     res.render("girisyap");
 });
 
router.post("/girisyap", passport.authenticate("local",
     {
         successRedirect: "/bitkiler",
         failureRedirect: "/girisyap",
     }), function(req, res){
 
 });
 
router.get("/cikisyap", function(req, res){
     req.logout();
     req.flash("error", "Çıkış Yaptınız");
     res.redirect("/bitkiler");
 });


 module.exports = router;