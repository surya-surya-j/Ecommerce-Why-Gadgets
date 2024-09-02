const mongoose = require("mongoose");

const addtoCart = mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: String,
    },
    quantity: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const addToCartModel = mongoose.model("addTocart", addtoCart);

module.exports = addToCartModel;
