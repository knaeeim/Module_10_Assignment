const ProductModel = require("../model/ProductModel");
const User = require("../model/userModel");

exports.createProduct = async (req, res) => {
    try {

        const {name, price} = req.body;
        if (!name || !price) {
            return res.json({msg: "Please input the valid data"})
        }

        const existingName = await ProductModel.findOne({name});
        if (existingName) {
            return res.json({msg: "Product Name is already exist in database"})
        }

        const createdProduct = await new ProductModel({
            name,
            price,
            ProductCreatedBy: req.headers.name
        }).save();

        res.json(createdProduct);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getProducts = async (req, res) => {
    //if you want to received products according to specific users and you have to pass the parameter on find({ProductsCreatedBy:userName}, "name price") the it will show products according to user who actually created the products
    // const userName= req.headers.name
    try {
        const products = await ProductModel.find({}, "name price");
        res.json(products);

    } catch (error) {
        res.status(500).json({error:error.message});
    }

}