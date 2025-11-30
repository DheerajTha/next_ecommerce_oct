import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },

    mrp: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      default: null,
      index: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },

    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
      },
    ],

    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);
productVariantSchema.index({ createdAt: 1 });
const ProductVariantModel =
  mongoose.models.productVariant ||
  mongoose.model("productVariant", productVariantSchema, "productVariants");

export default ProductVariantModel;
