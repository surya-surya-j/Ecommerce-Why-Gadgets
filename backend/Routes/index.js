const express = require("express");
// const userSignupController = require("../Controller/user/userSignup");
// const userDetailsController = require("../Controller/user/userDetails");
const router = express.Router();
const userSignupController = require("../Controller/user/userSignup");
const userSigninController = require("../Controller/user/userSignin");
const userDetailsController = require("../Controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogOut = require("../Controller/user/userLogout");
const allUser = require("../Controller/user/allUser");
const updateUser = require("../Controller/user/updateUser");
const uploadProductController = require("../Controller/product/uploadProduct");
const getProductContoller = require("../Controller/product/getProduct");
const updateProductController = require("../Controller/product/updateProduct");
const getCategoryProductsOne = require("../Controller/product/getCategoryProductsOne");
const getCategoryWiseProduct = require("../Controller/product/getCategoryWiseProduct");
const getProductDetails = require("../Controller/product/getProductDetails");
const addTocartController = require("../Controller/user/addToCartController");
const countAddToCartProduct = require("../Controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../Controller/user/addToCartViewProducts");

router.post("/signup", userSignupController);
router.post("/signin", userSigninController);
router.get("/user-details", authToken, userDetailsController);
router.get("/user-logout", userLogOut);

// Admin panel

router.get("/all-user", authToken, allUser);
router.post("/update-user", authToken, updateUser);

// upload product and get products  api end point

router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductContoller);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProducts", getCategoryProductsOne);
router.post("/category-products", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);

// user add to cart

router.post("/addtocart", authToken, addTocartController);
router.get('/countaddtocartproduct',authToken,countAddToCartProduct)
router.get('/view-cart-product',authToken,addToCartViewProduct)
module.exports = router;
