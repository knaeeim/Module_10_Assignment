const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            trim: true,
            required: [true, "email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {timestamps: true, versionKey: false}
);

const User = mongoose.model("User", userSchema);
module.exports = User;