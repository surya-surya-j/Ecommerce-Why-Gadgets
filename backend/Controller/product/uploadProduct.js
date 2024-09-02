// const uploadProductPermission = require("../helpers/uploadPermission");
// const productModel = require("../models/productModel");

// const uploadProductController = async (req, res) => {
//   try {
//     const sessionUserId = await req.userId;

//     if (!uploadProductPermission(sessionUserId)) {
//       throw new Error("Permission Denied");
//     }

//     const uploadProduct = await new productModel(req.body);
//     const saveProduct = await uploadProduct.save();
//     console.log(saveProduct,'save');

//     res.status(201).json({
//       message: "Product upload Successfully",
//       error: false,
//       success: true,
//       data: saveProduct,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// module.exports = uploadProductController;

const uploadProductPermission = require("../../helpers/uploadPermission");
const productModel = require("../../models/productModel");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Product upload successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;
