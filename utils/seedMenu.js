import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Menu from "../models/menu.model.js";
dotenv.config();
connectDB();

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
        await Menu.deleteMany();
        await Menu.insertMany(menuItems);
        console.log("Menu seeded successfully");
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
seedData();