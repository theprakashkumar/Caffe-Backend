const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://pk:BYKSpoHN34CcZ4uH@cluster0.d4ung.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    )
    .then(() => console.log("Connected 🔥"))
    .catch((err) => console.log("Something Went Wrong 😟", err));
};

module.exports = connect;
