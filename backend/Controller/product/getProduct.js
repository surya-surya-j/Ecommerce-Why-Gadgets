const productModel = require("../../models/productModel");

const getProductContoller = async (req, res) => {
  try {
    const allProduct = await productModel.find().sort({ creteadAt: -1 });

    res.json({
      message: "All product",
      success: true,
      data: allProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductContoller;
