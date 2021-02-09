var mongoose = require("mongoose");

var yorumSchema = mongoose.Schema({
    yazı: String,
    yazar: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Yorum", yorumSchema);