const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("Connected 🔥"))
    .catch(err => console.log("Something Went Wrong 😟", err));
};

module.exports = connect;