const jwt = require("jsonwebtoken");
require("dotenv").config();
const Product = require("../model/ProductModel");

const authenticate = (req, res, next) => {
    const bearerToken = req.headers["authorization"];

    if (!bearerToken) {
        return res.status(401).json({msg: "Unauthorized"});
    }

    const bear = bearerToken.split(" ");
    const token = bear[1];
    // req.token = token;

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).json({msg: "Error verifying token"});
        }
        const {_id, name} = decode;
        req.headers._id = _id;
        req.headers.name = name;
        next();
    });
};

module.exports = {authenticate};