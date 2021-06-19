const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.find({
            email,
            password,
        });
        if (!user) {
            res.status(200).json({
                success: false,
                message: "Wrong Credential",
            });
        } else {
            res.status(200).json({
                success: true,
                data: user,
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Couldn't Login",
        });
    }
};

const createNewUser = async (req, res) => {
    try {
        const body = req.body;
        const userFound = await User.findOne({ email: body.email });
        if (userFound) {
            res.status(409).json({
                success: true,
                error: "User Already Exists With the Email!",
            });
        }
        const newUser = new User(body);

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashPassword;
        const createdUser = await newUser.save();

        res.status(200).json({
            success: true,
            user: createdUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Couldn't Create New User",
            errorMessage: err.message,
        });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Couldn't Find User With the Given Id",
        });
    }
};

module.exports = {
    getUserLogin,
    createNewUser,
    getUserDetails,
};
