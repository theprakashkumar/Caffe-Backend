const express = require("express");
const env = require("dotenv");
var cors = require("cors");

const connect = require("./db/connect");
const productRouter = require("./routes/products.routes");
const userRouter = require("./routes/user.routes");
const cartRouter = require("./routes/cart.routes");
const wishlistRouter = require("./routes/wishlist.routes");

// configuration
const app = express();
app.use(express.json());
env.config();
app.use(cors())

// connect to DB
connect();

app.get("/", function (req, res) {
    res.send("Welcome to Cafe-Backend 😊");
});

// routes
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);

// listen on port 5000
app.listen(process.env.PORT || 5000, function () {
    console.log("Server Started 🙌");
});
