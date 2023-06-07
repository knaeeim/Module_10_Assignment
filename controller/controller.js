const product = require("../model/model");

exports.createProduct = async (req, res) => {
    try{
        const {name, price } = req.body;
        if(!name){
            return res.json({ msg: "Please input the valid data"})
        }
        if(!price){
            return res.json({ msg: "Please input the valid data"})
        }
        const existingName = await product.findOne({ name });
        if(existingName){
            return res.json({ msg: "Product Name is already exist in database"})
        }
        const products = await new product({
            name, price
        }).save();

        res.json(products)

    } catch (error){
        res.status(500).json({ error: "Internal Server Error"});
        console.log(error);
    }
}

exports.getProducts = async (req, res) => {
  try {
      const products = await product.find({}, "name price");

      res.json(products);
  } catch (error){
      res.status(500).json({ error: "Internal Server Error"});
      console.log(error);
  }

}