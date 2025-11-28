const express = require("express");
const router = express.Router();
const DiscordProduct = require("../models/DiscordProducts");

// Obtener solo disponibles
router.get("/products", async (req, res) => {
    const productos = await DiscordProduct.findAll({
        where: { status: "disponible" },
        order: [["created_at", "DESC"]]
    });

    res.json(productos);
});

// Obtener todas (por si quieres admin)
router.get("/products/all", async (req, res) => {
    const productos = await DiscordProduct.findAll();
    res.json(productos);
});

module.exports = router;
