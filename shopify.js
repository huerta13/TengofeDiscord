const axios = require("axios");
require('dotenv').config();


const SHOP = "1kspts-jp.myshopify.com";
const TOKEN = process.env.SHOPIFY_TOKEN;

const shopify = axios.create({
    baseURL: `https://${SHOP}/admin/api/2024-04/`,
    headers: {
        "X-Shopify-Access-Token": TOKEN,
        "Content-Type": "application/json"
    }
});

// Crear producto
async function crearProducto(titulo, descripcion, imagenes, precio, tags) {

    // Convertimos las imágenes a formato Shopify
    const imagenesFormateadas = imagenes.map(url => ({
        src: url
    }));

    const response = await shopify.post("products.json", {
        product: {
            title: titulo,
            body_html: descripcion,
            tags: tags,   // <- ya no dará error
            images: imagenesFormateadas,
            variants: [
                {
                    price: precio.toString(),
                    inventory_management: "shopify",
                    requires_shipping: false,
                    inventory_quantity: 1
                }
            ]
        }
    });

    return response.data.product;
}

// Eliminar producto
async function eliminarProducto(id) {
    await shopify.delete(`products/${id}.json`);
}

module.exports = {
    crearProducto,
    eliminarProducto
};
