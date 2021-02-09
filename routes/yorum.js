const express = require("express");
const router  = express.Router({mergeParams: true});
const Bitki   = require("../models/bitki");
const Yorum   = require("../models/yorum");
const middleware = require("../middleware");

router.get("/yeni", middleware.isLoggedIn, function(req, res){
    Bitki.findById(req.params.id, function(err, bitki){
        if(err || !bitki){
            req.flash("error", "Bitki Bulunamadı");
            res.redirect("back");
        } else {
            req.flash("success", "Yeni Bitki Eklendi");
            res.render("comments/yeni", {bitki: bitki});
        }
    });
   
});

router.post("/", middleware.isLoggedIn, function(req, res){
    Bitki.findById(req.params.id, function(err, bitki){
        if(err){
            console.log(err);
            res.redirect("/bitkiler");
        } else {
            Yorum.create(req.body.yorum, function(err, yorum){
                if(err){
                    req.flash("error", "Bir Şeyler Yanlış Gitti");
                    console.log(err);                    
                } else {
                    yorum.yazar.id = req.user._id;
                    yorum.yazar.username = req.user.username;
                    yorum.save();
                    bitki.yorums.push(yorum);
                    bitki.save();
                    req.flash("success", "Yorum Başarıyla Eklendi");
                    res.redirect('/bitkiler/' + bitki._id);
                }
            });
        }
    });
});

router.get("/:yorum_id/edit",middleware.checkYorumOwnership, function(req, res) {
    Bitki.findById(req.params.id, function(err, bulunanBitki){
        if(err || !bulunanBitki){
            req.flash("error", "Bitki Bulunamadı");
            return res.redirect("back");
        }
        Yorum.findById(req.params.yorum_id, function(err, bulunanYorum){
            if(err || !bulunanYorum){
                req.flash("error", "Yorum Bulunamadı");
                return res.redirect("back");
            } else {
                req.flash("success", "Yorum Eklendi");
                res.render("comments/edit", {bitki_id: req.params.id, yorum: bulunanYorum})
            }
        });
    });
});

router.put("/:yorum_id", middleware.checkYorumOwnership, function(req, res){
    Yorum.findByIdAndUpdate(req.params.yorum_id, req.body.yorum, function(err, guncelYorum){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/bitkiler/" + req.params.id);
        }
    });
});

router.delete("/:yorum_id", middleware.checkYorumOwnership, function(req, res){
    Yorum.findByIdAndRemove(req.params.yorum_id, function(err){
        if(err){
            req.flash("error", "Bir Şeyler Yanlış Gitti");
            res.redirect("back");
        } else {
            req.flash("success", "Yorum Silindi");
            res.redirect("/bitkiler/" + req.params.id);
        }
    });
});



module.exports = router;