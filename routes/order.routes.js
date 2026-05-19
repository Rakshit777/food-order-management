import express from "express";
import {
    createOrder,
    deleteOrder,
    getOrders,
    getSingleOrder,
    updateOrderStatus,
} from "../controllers/order.controller.js";
const router = express.Router();
router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getSingleOrder);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);
export default router;