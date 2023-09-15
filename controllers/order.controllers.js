const dontenv = require("dotenv");
const Razorpay = require("razorpay");

dontenv.config();
// create new instance of Razorypay
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
    var options = {
        amount: 50000, // amount in the smallest currency unit
        currency: "INR",
    };
    const newOrder = await razorpayInstance.orders.create(options);
    console.log(newOrder);
    res.send("newOrder");
};

module.exports = { createOrder };
