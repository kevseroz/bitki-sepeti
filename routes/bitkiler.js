const express = require("express");
const router  = express.Router();
//bitkiyi tanımlamazsak bulamıyor
const Bitki   = require("../models/bitki");
const middleware = require("../middleware");

router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Bitki.find({isim: regex}, function(err, bütünBitkiler){
            if(err){
                console.log(err);
            } else {
                if(bütünBitkiler.length < 1) {
                    noMatch = "Aradığınız sorguyla eşleşen bir sonuç bulunamadı, lütfen tekrar deneyin.";
                }
                res.render("bitkiler/bitkiler", {bitkis: bütünBitkiler, noMatch: noMatch});
            }
    }); 
    } else {
        Bitki.find({}, function(err, bütünBitkiler){
            if(err){
                console.log(err);
            } else {
                res.render("bitkiler/bitkiler", {bitkis: bütünBitkiler, noMatch: noMatch});
            }
    }); 
}
 });

router.post("/", middleware.isLoggedIn, function(req, res){
    var isim = req.body.isim;
    var resim = req.body.resim;
    var tanıtım = req.body.tanıtım;
    var yazar = {
        id: req.user._id,
        username: req.user.username
    };
    var yenibitki = {isim: isim, resim: resim, tanıtım: tanıtım, yazar: yazar};
    Bitki.create(yenibitki, function(err, yeniBitki){
        if(err){
            console.log(err);
        } else {
            res.redirect("/bitkiler");
        }
    });
 });

router.get("/yeni", function(req, res){
    res.render("bitkiler/yeni"); 
 });
 
router.get("/:id", function(req, res){
     Bitki.findById(req.params.id).populate("yorums").exec(function(err, bilgiBitki){
         if(err || !bilgiBitki){
             req.flash("error", "Bitki Bulunamadı");
             res.redirect("back");
         } else{
             res.render("bitkiler/bilgi", {bitki: bilgiBitki});
         }  
     });
 });

 router.get("/:id/edit", middleware.checkBitkiOwnership, function(req, res){
     Bitki.findById(req.params.id, function(err, bulunanBitki){
         if(err){
             res.redirect("/bitkiler")
         } else {
            res.render("bitkiler/edit", {bitki: bulunanBitki});  
         }
     });
 });

 router.put("/:id", middleware.checkBitkiOwnership, function(req, res){
     Bitki.findByIdAndUpdate(req.params.id, req.body.bitki, function(err, guncelBitki){
         if(err){
             res.redirect("/bitkiler");
         } else {
             res.redirect("/bitkiler/" + req.params.id);
         }
     });
 });

 router.delete("/:id", middleware.checkBitkiOwnership, function(req, res){
     Bitki.findByIdAndRemove(req.params.id, function(err){
         if(err){
             res.redirect("/bitkiler");
         } else {
             res.redirect("/bitkiler");
         }
     });
 });

 function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

 module.exports = router;


/* router.get("/", function(req, res){
    Bitki.find({}, function(err, bütünBitkiler){
        if(err){
            console.log(err);
        } else {
            res.render("bitkiler/bitkiler", {bitkis: bütünBitkiler});
        }
}); 
});*/