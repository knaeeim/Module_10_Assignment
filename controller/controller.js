const Product = require("../model/model");
const User = require("../model/user");

exports.createProduct = async (req, res) => {
    try {
        const {name, price} = req.body;
        if (!name || !price) {
            return res.json({msg: "Please input the valid data"})
        }

        const existingName = await Product.findOne({name});
        if (existingName) {
            return res.json({msg: "Product Name is already exist in database"})
        }

        const createdProduct = await new Product({
            name,
            price,
        }).save();

        res.json(createdProduct);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
        console.log(error);
    }
}

exports.getProducts = async (req, res) => {
    try {

        const products = await Product.find({}, "name price");

        res.json(products);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
        console.log(error);
    }

}