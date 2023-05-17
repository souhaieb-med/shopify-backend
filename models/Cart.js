import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);

// the Cart should have the userId to identify the user
// the product is an array of object containg the productId who will have a type of String and the quantity with a type of Number and we set it as default with 1 piece
