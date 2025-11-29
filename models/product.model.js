import mongoose from "mongoose";
import { resumeAndPrerender } from "react-dom/static";

const producutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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

    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
      },
    ],

    description: {
      type: String,
      required: true,
    },

    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);
producutSchema.index({ createdAt: 1 });
const ProductModel =
  mongoose.models.Product ||
  mongoose.model("Product", producutSchema, "Products");

export default ProductModel;
