const DiscordProduct = require("./Models/DiscordProducts");
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

function acortarTexto(texto, max = 250) {
    if (!texto) return "";
    texto = texto.trim();

    if (texto.length <= max) return texto;

    // Corta limpio sin cortar palabras a la mitad
    let corto = texto.slice(0, max);
    const ultimoEspacio = corto.lastIndexOf(" ");

    if (ultimoEspacio > 0) {
        corto = corto.slice(0, ultimoEspacio);
    }

    return corto + "...";
}

async function procesarMensaje(message) {
    try {
        // 📷 Obtener imágenes
        const images = message.attachments.map(a => a.url);
        if (images.length === 0) return;

        // 💲 Extraer precio
        const price = extraerPrecio(message.content);
        if (price === null || isNaN(price)) {
            console.log(`⚠️ Mensaje ignorado (sin precio válido): ${message.id}`);
            return;
        }

        // 🏷️ Categoría según canal
        const canalID = message.channel.id;
        const categoria = CHANNEL_CATEGORY[canalID] || "Sin categoría";

        // 📝 Título corto seguro
        const tituloCorto = acortarTexto(message.content, 250);

        // 🏷️ Nombre del canal (por si lo usas después)
        const channelName = message.channel.name;
        const tags = [channelName]; // (opcional)

        // 🛒 Crear producto en Shopify
        const productoShopify = await crearProducto(
            tituloCorto,         // título
            message.content,     // descripción
            images,              // imágenes
            price,               // 💲 SIEMPRE válido
            categoria
        );

        // 💾 Guardar relación en BD
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

    } catch (error) {
        console.error(`❌ Error procesando mensaje ${message.id}:`, error);
    }
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
