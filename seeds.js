var mongoose = require("mongoose");
var Bitki = require("./models/bitki");
var Yorum = require("./models/yorum");

const data = [
    {
        isim: "Gül",
        resim:"https://images.unsplash.com/photo-1531874824027-2a0d33bd6338?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        tanıtım: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        isim: "Papatya",
        resim: "https://images.unsplash.com/photo-1460039230329-eb070fc6c77c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        tanıtım: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        isim: "Lale",
        resim: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        tanıtım: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

function seedDB(){
    Bitki.remove({}, (err)=>{
        if(err){
            console.log(err);
        }
        console.log("bitkiler kaldırıldı");
       /* data.forEach(function(seed){
            Bitki.create(seed, function(err, bitki){
                if(err){
                    console.log(err);
                } else {
                    console.log("bitki eklendi");
                    Yorum.create(
                        {
                            yazı:"Bu bitki güneşi sever iki günde bir su verin",
                            yazan:"Pervin Özkan"
                        }, function(err, yorum){
                            if(err){
                                console.log(err);
                            } else {
                                bitki.yorums.push(yorum);
                                bitki.save();
                                console.log("yeni yorum eklendi");
                            }
                        });
                }
            });
        });*/
    });
}

module.exports = seedDB;