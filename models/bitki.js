var mongoose = require("mongoose");

var bitkiSchema = new mongoose.Schema({
    isim: String,
    resim: String,
    tanıtım: String,
    yazar: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    yorums: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Yorum"
        }
    ]
});

module.exports = mongoose.model("Bitki", bitkiSchema);