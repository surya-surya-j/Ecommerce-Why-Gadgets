const productModel = require("../../models/productModel");

const getCategoryProducts = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");

    const productByCategory = [];

    // array to store one product from each category
    for (const category of productCategory) {
      const product = await productModel.findOne({ category });
      if (product) {
        productByCategory.push(product);
      }
    }

    res.json({
      message: "category products",
      data: productByCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryProducts;
