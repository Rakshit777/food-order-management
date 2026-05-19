import dotenv from "dotenv";
import cron from "node-cron";
import app from "./app.js";
import connectDB from "./config/db.js";
import Order from "./models/order.model.js";
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Real-time Status Simulation
cron.schedule("*/1 * * * *", async () => {
    try {
        const orders = await Order.find();
        for (const order of orders) {
            if (order.status === "Order Received") {
                order.status = "Preparing";
            } else if (order.status === "Preparing") {
                order.status = "Out for Delivery";
            } else if (order.status === "Out for Delivery") {
                order.status = "Delivered";
            }
            await order.save();
        }
        console.log("Order status updated");
    } catch (error) {
        console.log(error.message);
    }
});