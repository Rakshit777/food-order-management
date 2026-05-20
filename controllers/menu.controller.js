import Menu from "../models/menu.model.js";

export const getMenu = async (req, res) => {
    try {
        const menu = await Menu.findAll();
        res.status(200).json({
            success: true,
            data: menu,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};