import { DataTypes, Model } from "sequelize";
import { getSequelize } from "../config/db.js";

class Order extends Model {}
class OrderItem extends Model {}

const sequelize = getSequelize();

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(
                "Order Received",
                "Preparing",
                "Out for Delivery",
                "Delivered"
            ),
            allowNull: false,
            defaultValue: "Order Received",
        },
    },
    {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        timestamps: true,
    }
);

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        menuItemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        modelName: "OrderItem",
        tableName: "order_items",
        timestamps: false,
    }
);

// Associations: Order -> OrderItem, OrderItem -> Menu
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

// Provide a helper to associate OrderItem with Menu after Menu is defined
const associateModels = (Menu) => {
    if (!Menu) return;
    OrderItem.belongsTo(Menu, { foreignKey: "menuItemId", as: "menuItem" });
    Menu.hasMany(OrderItem, { foreignKey: "menuItemId" });
};

export { OrderItem, associateModels };
export default Order;

