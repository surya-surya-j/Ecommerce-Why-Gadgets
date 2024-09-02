const uploadProductPermission = require("../../helpers/uploadPermission");
const productModel = require("../../models/productModel");
const updateProductController = async (req, res) => {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }

    const { _id, ...resBody } = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, {
      new: true,
    });

    res.json({
      message: "product update Successfully",
      success: true,
      error: false,
      data: updateProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = updateProductController;
