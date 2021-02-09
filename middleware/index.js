let Bitki = require("../models/bitki");
let Yorum = require("../models/yorum");

let middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Lütfen Giriş Yapın");
    res.redirect("/girisyap");
}

middlewareObj.checkYorumOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Yorum.findById(req.params.yorum_id, function(err, bulunanYorum){
            if(err || !bulunanYorum){
                req.flash("error", "Yorum Bulunamadı");
                res.redirect("back");
            } else {
                if(bulunanYorum.yazar.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Bunu Yapmaya İzniniz Yok")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Bunu Yapabilmeniz İçin Giriş Yapmalısnız")
        res.redirect("back");
    }
}

middlewareObj.checkBitkiOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Bitki.findById(req.params.id, function(err, bulunanBitki){
            if(err || !bulunanBitki){
                req.flash("error", "Bitki Bulunamadı");
                res.redirect("back");
            } else {
                if(bulunanBitki.yazar.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Bunu Yapmak İçin Yetkili Değilsiniz");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Bu İşlem İçin Giriş Yapmanız Gerekiyor");
        res.redirect("back");
    }
}

module.exports = middlewareObj;