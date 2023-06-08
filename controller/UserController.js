const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const {hashPassword, comparePassword} = require("../helper/auth");
const {generateToken} = require('../utilities/generateToken')

exports.createNewUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name) {
            return res.json({message: "Please input your name"});
        }
        if (!email) {
            return res.json({message: "Please input your valid email"});
        }
        if (!password || password.length < 8) {
            return res.json({
                message:
                    "Password must be at least 8 characters long",
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.json({
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
            });
        }
        ;
        const hashedPassword = await hashPassword(password);
        const user = await new User({
            name,
            email,
            password: hashedPassword,
        }).save();

        const token = generateToken({_id: user._id, name:user.name});

        res.json({
            user: {
                name: user.name,
                email: user.email,
            },
            token
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email) {
            return res.json({error: "Email is required"});
        }
        ;
        if (!password || password.length < 8) {
            return res.json({error: "Password must be at least 8 characters long"});
        }
        const user = await User.findOne({email})

        if (!user) {
            res.json({msg: `no existing user in this ${user.email}`});
        }
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.json({error: "Invalid email or password"});
        }

        const token = generateToken({_id: user._id, name: user.name})

        res.json({
            user: {
                name: user.name,
                email: user.email
            },
            token,
        });
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
        console.log(error);
    }
}
