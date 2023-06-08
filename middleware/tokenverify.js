const jwt = require("jsonwebtoken");
require("dotenv").config();
const Product = require("../model/model");

const authenticate = (req, res, next) => {
    const bearerToken = req.headers["authorization"];

    if (!bearerToken) {
        return res.status(401).json({msg: "Unauthorized"});
    }

    const bear = bearerToken.split(" ");
    const token = bear[1];
    req.token = token;

    jwt.verify(req.token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).json({msg: "Error verifying token"});
        }
        req.decode = decode;
        next();
    });
};

module.exports = {authenticate};