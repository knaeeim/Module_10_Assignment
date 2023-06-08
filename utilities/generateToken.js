const jwt = require('jsonwebtoken');

require('dotenv').config();

const generateToken = (user) => {
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "5h"});
    return token;
}

module.exports = {generateToken};