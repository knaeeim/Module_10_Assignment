const express = require('express');

const router = express.Router();

const { createProduct, getProducts } = require('../controller/controller');

const { createNewUser, login } = require("../controller/UserController");

const { tokenverify } = require('../middleware/middleware');


router.get("/products", tokenverify, getProducts );

router.post("/create-product", tokenverify, createProduct)

router.post("/new-user", createNewUser);

router.get("/login", login);


module.exports = router;