const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./users");

const passwordSchema = new Schema({
    site: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Password = mongoose.model("Password", passwordSchema);
module.exports = Password;