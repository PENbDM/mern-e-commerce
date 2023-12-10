import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: {
          type: String,
          // You can set additional validation rules if needed
        },
        size: {
          type: String,
          // You can set additional validation rules if needed
        },
      },
    ],
    userId: { type: String, required: true },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      line1: {
        type: String,
      },
      line2: {
        type: String,
        default: null,
      },
      postal_code: {
        type: String,
      },
      state: {
        type: String,
        default: null,
      },
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
