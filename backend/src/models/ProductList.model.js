import { Schema, model } from "mongoose";

const productListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    productsArray: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product", // linking to Product collection
      }
    ]
  },
  { timestamps: true }
);

const ProductList = model("ProductList", productListSchema);
export default ProductList;
