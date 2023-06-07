const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/user.js");

const tokenverify = (req, res, next) => {
    try {
        const decoded = jwt.verify(
            req.headers["authorization"],
            process.env.JWT_SECRET
        );

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json(err);
    }
};

module.exports = {tokenverify};