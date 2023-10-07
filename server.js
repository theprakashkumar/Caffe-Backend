const express = require("express");
const env = require("dotenv");
const cors = require("cors");

const connect = require("./db/connect");
const authenticate = require("./middleware/authenticate");
const productRouter = require("./routes/products.routes");
const userRouter = require("./routes/user.routes");
const cartRouter = require("./routes/cart.routes");
const wishlistRouter = require("./routes/wishlist.routes");
const addressRouter = require("./routes/address.routes");
const orderRouter = require("./routes/order.routes");

// configuration
const app = express();
app.use(express.json());
env.config();
app.use(cors());

// connect to DB
connect();

app.get("/", function (req, res) {
    res.send("Welcome to Cafe-Backend 😊");
});

// routes

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/cart", authenticate, cartRouter);
app.use("/wishlist", authenticate, wishlistRouter);
app.use("/address", authenticate, addressRouter);
app.use("/order", authenticate, orderRouter);

// listen on port 5000
app.listen(process.env.PORT || 8080, function () {
    console.log("Server Started 🙌");
});
