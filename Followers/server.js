const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// 🔐 TU API KEY DE MARKETFOLLOWERS
const API_KEY = "56fa718074b97b08591a838f221917bd";

// 📌 Endpoint para recibir las órdenes desde Shopify
app.post("/webhook/order-paid", async (req, res) => {
  try {
    const order = req.body;

    // 1. Extraer datos útiles de la orden
    const product = order.line_items[0].title;
    const link = order.note_attributes?.find(n => n.name === "profile_link")?.value;
    const quantity = order.line_items[0].quantity;

    // 2. Mapear el producto al ID del servicio en MarketFollowers
    const serviceId = mapService(product);
    if (!serviceId) return res.status(400).send("Servicio no encontrado.");

    // 3. Crear la orden en MarketFollowers
    const form = new URLSearchParams();
    form.append("key", API_KEY);
    form.append("action", "add");
    form.append("service", serviceId);
    form.append("link", link);
    form.append("quantity", quantity);

    const mfResponse = await axios.post(
      "https://marketfollowers.com/api/v2",
      form
    );

    console.log("Orden creada:", mfResponse.data);

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).send("Error");
  }
});

// 🔧 Mapeo producto → servicio API
const mapService = (productName) => {
  const map = {
    "Seguidores Instagram 100": 1,
    "Seguidores Instagram 500": 2,
    "Likes TikTok": 5,
  };

  return map[productName] || null;
};

app.listen(3000, () => console.log("API corriendo en el puerto 3000"));
