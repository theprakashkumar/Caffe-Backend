const dontenv = require("dotenv");
const Razorpay = require("razorpay");
const {
    validatePaymentVerification,
} = require("../node_modules/razorpay/dist/utils/razorpay-utils");
const Order = require("../models/order");
const Cart = require("../models/cart");

dontenv.config();

// create new instance of Razorypay
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const gerOrders = async (req, res) => {
    try {
        const user = req.params.user;

        const order = await Order.find({ user })
            .populate("items.product")
            .sort({ time: -1 });

        return res.status(200).json({ success: true, order });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Couldn't Fetch Orders!",
            errorMessage: error.message,
        });
    }
};

// create order on razorpay
const createOrder = async (req, res) => {
    const { amount } = req.body;
    try {
        var options = {
            amount, // amount in the smallest currency unit
            currency: "INR",
        };
        const newOrder = await razorpayInstance.orders.create(options);

        return res.status(200).json({
            success: true,
            newOrder,
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Couldn't Create an Order!",
        });
    }
};

const placeOrder = async (req, res) => {
    try {
        // verify payment
        const user = req.params.user;
        const {
            paymentId,
            orderId,
            signature,
            address,
            mobile,
            items,
            totalPrice,
        } = req.body;

        const isPaymentValid = validatePaymentVerification(
            { order_id: orderId, payment_id: paymentId },
            signature,
            process.env.RAZORPAY_KEY_SECRET
        );

        if (isPaymentValid) {
            // save payment and order details to DB
            const newOrder = new Order({
                user,
                paymentId,
                orderId,
                signature,
                address,
                mobile,
                items: items.map((item) => ({
                    product: item.product,
                    mrp: item.mrp,
                    quantity: item.quantity,
                })),
                totalPrice,
            });

            const order = await newOrder.save();
            // clear all the items from user's cart
            const cart = await Cart.findOne({ user });
            cart.cartItems = [];
            const updatedCart = await cart.save();

            // if everything right return success and new cart
            res.status(200).json({
                success: true,
                updatedCart,
                orderId,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something Went Wrong While Verifying Payment",
            errorMessage: error.message,
        });
    }
};

module.exports = { createOrder, placeOrder, gerOrders };
