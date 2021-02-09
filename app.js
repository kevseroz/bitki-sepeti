var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local")
    Bitki         = require("./models/bitki"),
    seedDB        = require("./seeds"),
    Yorum         = require("./models/yorum"),
    User          = require("./models/user"),
    methodOverride= require("method-override");


var yorumRoutes   = require("./routes/yorum"),
    bitkilerRoutes= require("./routes/bitkiler"),
    indexRoutes   = require("./routes/index");



app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/bitki_sepeti", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//passport gereksinimleri
app.use(require("express-session")({
    secret: "herhangi birsey",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/bitkiler", bitkilerRoutes);
app.use("/bitkiler/:id/yorumlar", yorumRoutes);




const PORT = 5000;

app.listen(PORT, ()=> {
    console.log(`server running ${PORT}`);
});
/*app.listen(process.env.PORT, process.env.IP, function(){
    console.log("bitki uygulamasi başladı");
});*/