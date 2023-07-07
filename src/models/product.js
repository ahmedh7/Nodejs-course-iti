const mongoose = require("mongoose");
const uuid = require("uuid");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      index: true,
      default: uuid.v4,
      required: true,
    },
    name: {
      en: {
        type: String,
      },
      ar: {
        type: String,
      },
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    discountType: {
      type: String,
      enum: ["FIXED", "PERCENTAGE"],
    },
    description: {
      type: String,
    },
    categoryId: {
      type: String,
    },
    totalCount: {
      type: Number,
    },
    avaliable: {
      type: Boolean,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const productModel = mongoose.model("Product", productSchema, "products");

module.exports = productModel;
