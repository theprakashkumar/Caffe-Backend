const User = require("../models/user");

const getUserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
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
        const user = req.body;
        const newUser = new User(user);
        const createdUser = await newUser.save();

        res.status(200).json({
            success: true,
            user: createdUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Couldn't Create New User",
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
