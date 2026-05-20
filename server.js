import dotenv from "dotenv";
import cron from "node-cron";
import connectDB, { syncModels } from "./config/db.js";
dotenv.config();

// Connect DB first so models can access the Sequelize instance when they're imported
await connectDB();

const OrderModule = await import("./models/order.model.js");
const MenuModule = await import("./models/menu.model.js");
const Order = OrderModule.default;

// ensure associations are set up after both models are loaded
if (OrderModule.associateModels) {
    OrderModule.associateModels(MenuModule.default);
}

// sync models (creates/updates tables) after models are defined and associations set
await syncModels({ force: process.env.DB_SYNC_FORCE === "true" });

const appModule = await import("./app.js");
const app = appModule.default;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Real-time Status Simulation
cron.schedule("*/1 * * * *", async () => {
    try {
        const orders = await Order.findAll();
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