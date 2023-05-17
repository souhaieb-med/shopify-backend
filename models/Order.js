import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
      required: true,
    },
    adress: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);

// the Cart should have the userId to identify the user
// the product is an array of object containg the productId who will have a type of String and the quantity with a type of Number and we set it as default with 1 piece
// the amount will be used for payment  the type will be Number and required
// the adress will refer to user the type object because the stripe will return an object , and required
// the status is string and default pending and after purchasing we will change it to "on the way"
