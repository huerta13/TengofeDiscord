const DiscordProduct = require("./models/DiscordProducts");
const { crearProducto, eliminarProducto } = require("./shopify");

const regexPatterns = [
    /\((\d+)\s*mx[n]?\)/i,
    /(\d+)\s*mx[n]?\b/i,
    /\$\s*(\d+)/,
    /(\d+)\s*pesos/i
];

const CHANNEL_CATEGORY = {
    "1389358951480561745": "Fortnite",
    "1393294587409334322": "Free Fire",
    "1393294722985885746": "Clash",
    "1393318889894449342": "TikTok",
    "1393294754187444294": "Brawl Stars"
};

function extraerPrecio(texto) {
    for (const pattern of regexPatterns) {
        const match = texto.match(pattern);
        if (match) return parseInt(match[1]);
    }
    return null;
}

async function procesarMensaje(message) {

    const images = message.attachments.map(a => a.url);
    if (images.length === 0) return;

    const canalID = message.channel.id;

    // Obtener tag según canal
    const categoria = CHANNEL_CATEGORY[canalID] || "Sin categoría";

    const price = extraerPrecio(message.content);

    // ✅ Obtener nombre real del canal
    const channelName = message.channel.name; 

    // ✅ Usar nombre del canal como tag
    const tags = [channelName];

    // Crear producto en Shopify
    const productoShopify = await crearProducto(
        message.content,   // titulo
        message.content,   // descripción
        images,            // todas las imágenes
        price,
        categoria              // 👈 aquí mandamos los tags
    );

    await DiscordProduct.create({
        messageId: message.id,
        channelId: message.channel.id,
        content: message.content,
        images,
        price,
        shopifyProductId: productoShopify.id,
        status: "disponible",
        created_at: new Date(message.createdTimestamp)
    });

    console.log(`✅ Producto creado: ${message.id}`);
}

async function borrarProducto(message) {

    const producto = await DiscordProduct.findOne({
        where: { messageId: message.id }
    });

    if (!producto) return;

    if (producto.shopifyProductId) {
        await eliminarProducto(producto.shopifyProductId);
    }

    producto.status = "vendido";
    await producto.save();

    console.log(`❌ Producto vendido y eliminado: ${message.id}`);
}

module.exports = {
    procesarMensaje,
    borrarProducto
};
