import { DataTypes, Model } from "sequelize";
import { getSequelize } from "../config/db.js";

class Menu extends Model {}

const sequelize = getSequelize();

Menu.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Menu",
        tableName: "menus",
        timestamps: true,
    }
);

export default Menu;