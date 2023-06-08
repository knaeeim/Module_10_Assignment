const express = require('express');

const router = express.Router();

const {createProduct, getProducts} = require('../controller/ProductController');

const {createNewUser, login} = require("../controller/UserController");

const {authenticate} = require('../middleware/tokenverify');


router.post("/new-user", createNewUser);

router.get("/login", login);

router.get("/products", authenticate, getProducts);

router.post("/create-product", authenticate, createProduct)


module.exports = router;