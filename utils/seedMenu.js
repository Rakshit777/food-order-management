import dotenv from "dotenv";
import connectDB from "../config/db.js";
dotenv.config();

await connectDB();
const { default: Menu } = await import("../models/menu.model.js");
const { syncModels } = await import("../config/db.js");

// ensure tables exist/are updated before seeding
await syncModels({ force: process.env.DB_SYNC_FORCE === "true" });

const menuItems = [{
        name: "Cheese Pizza",
        description: "Loaded cheese pizza",
        price: 250,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },
    {
        name: "Veg Burger",
        description: "Delicious veg burger",
        price: 180,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
    {
        name: "Pasta",
        description: "Italian white sauce pasta",
        price: 220,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    },
];
const seedData = async () => {
    try {
        await Menu.destroy({ where: {} });
        await Menu.bulkCreate(menuItems);
        console.log("Menu seeded successfully");
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
seedData();