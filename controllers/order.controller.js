import Order, { OrderItem } from "../models/order.model.js";
import Menu from "../models/menu.model.js";

export const createOrder = async (req, res) => {
    try {
        const {
            items,
            customerName,
            address,
            phone
        } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order items are required",

            });
        }

        let totalAmount = 0;
        for (const item of items) {
            const menuItem = await Menu.findByPk(item.menuItem);

            if (!menuItem) {
                return res.status(404).json({
                    success: false,
                    message: "Menu item not found",
                });
            }
            totalAmount += menuItem.price * item.quantity;
        }

        const order = await Order.create({
            customerName,
            address,
            phone,
            totalAmount,
        });

        // create order items
        for (const item of items) {
            await OrderItem.create({
                orderId: order.id,
                menuItemId: item.menuItem,
                quantity: item.quantity,
            });
        }
        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
                include: [{ model: OrderItem, as: "items", include: [{ model: Menu, as: "menuItem" }] }],
            });
        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
                include: [{ model: OrderItem, as: "items", include: [{ model: Menu, as: "menuItem" }] }],
            });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        order.status = status;
        await order.save();
        res.status(200).json({
            success: true,
            message: "Order status updated",
            data: order,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        await OrderItem.destroy({ where: { orderId: order.id } });
        await order.destroy();
        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};