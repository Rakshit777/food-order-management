import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
        items: [{
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Menu",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        }, ],
        customerName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: [
                "Order Received",
                "Preparing",
                "Out for Delivery",
                "Delivered",
            ],
            default: "Order Received",
        },
    }, {
        timestamps: true,
    }

);
const Order = mongoose.model("Order", orderSchema);
export default Order;