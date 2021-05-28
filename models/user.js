const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: "User Must Have Name"
    },
    email: {
        type: String,
        required: "User Must Have Email"
    },
    password: {
        type: String,
        required: "User Must Have Password"
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;