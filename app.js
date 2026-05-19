import express from "express";
import cors from "cors";
import morgan from "morgan";
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";
const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use(cors({
  origin: "https://next-food-order-m9mf.vercel.app",
  credentials: true
}));
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Food Order API Running",
    });
});

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

export default app;