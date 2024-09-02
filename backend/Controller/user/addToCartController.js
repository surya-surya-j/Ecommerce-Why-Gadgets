const addToCartModel = require("../../models/cartProductModel");

const addTocartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req?.userId;

    const isProductAvaliable = await addToCartModel.findOne({ productId });

    console.log("isProductAvaliable", isProductAvaliable);

    if (isProductAvaliable) {
      return res.json({
        message: "Already exists in Add to Cart",
        success: false,
        error: true,
      });
    }

    const payLoad = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payLoad);

    const saveProduct = await newAddToCart.save();

   return res.json({
      data: saveProduct,
      message: "product Added in cart",
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = addTocartController;
