const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const token = jwt.sign(
                    { userId: user._id },
                    process.env.SECRET,
                    { expiresIn: "30 days" }
                );
                return res.status(200).json({
                    success: true,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: token,
                });
            }
            res.status(403).json({
                success: false,
                message: "Wrong Credential",
            });
        } else {
            res.status(401).json({
                success: false,
                message: "User Not Found!",
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
            return res.status(409).json({
                success: false,
                error: "User Already Exists With the Email!",
            });
        }
        const newUser = new User(body);

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashPassword;
        const createdUser = await newUser.save();

        const token = jwt.sign(
            { userId: createdUser._id },
            process.env.SECRET,
            { expiresIn: "30 days" }
        );
        return res.status(200).json({
            success: true,
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            token,
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
