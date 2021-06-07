const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// To Remove Error: DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
// mongoose.set('useCreateIndex', true);

const UserSchema = new Schema({
    name: {
        type: String,
        required: "User Must Have Name",
    },
    email: {
        type: String,
        required: "User Must Have Email",
        unique: [true, "Email Already Exist"],
    },
    password: {
        type: String,
        required: "User Must Have Password",
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
