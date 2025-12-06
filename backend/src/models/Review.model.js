import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    // product object (reference)
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // user profile logo / avatar (image URL)
    logo: {
      type: String,
      default: "",
    },

    // username of reviewer
    username: {
      type: String,
      required: true,
      trim: true,
    },

    // main review text
    review: {
      type: String,
      required: true,
      trim: true,
    },

    // stars (int)
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // likes count
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },

    // dislikes count
    dislike: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
