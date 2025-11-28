// ========================================
//       GENERADOR DE CSV PARA SHOPIFY
// ========================================
const fs = require("fs");
const { Sequelize } = require("sequelize");
const DiscordProduct = require("./models/DiscordProducts.js");

// Conexión MySQL
const sequelize = new Sequelize("discord_posts", "root", "310704", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

// Mapeo de ID de canal → categoría
const CHANNEL_CATEGORY = {
    "1389358951480561745": "Fortnite",
    "1393294587409334322": "Free Fire",
    "1393294722985885746": "Clash",
    "1393318889894449342": "TikTok",
    "1393294754187444294": "Brawl Stars"
};

// Columnas oficiales de Shopify — NO CAMBIAR EL ORDEN
const SHOPIFY_COLUMNS = [
    "Title","URL handle","Description","Vendor","Product category","Type","Tags",
    "Published on online store","Status","SKU","Barcode",
    "Option1 name","Option1 value","Option2 name","Option2 value",
    "Option3 name","Option3 value","Price","Compare-at price","Cost per item",
    "Charge tax","Tax code",
    "Unit price total measure","Unit price total measure unit",
    "Unit price base measure","Unit price base measure unit",
    "Inventory tracker","Inventory quantity",
    "Inventory policy",          // 👈 OBLIGATORIA
    "Weight value (grams)","Weight unit for display",
    "Requires shipping","Fulfillment service",
    "Product image URL","Image position","Image alt text","Variant image URL",
    "Gift card","SEO title","SEO description",
    "Google Shopping / Google product category",
    "Google Shopping / Gender","Google Shopping / Age group","Google Shopping / MPN",
    "Google Shopping / AdWords Grouping","Google Shopping / AdWords labels",
    "Google Shopping / Condition","Google Shopping / Custom product",
    "Google Shopping / Custom label 0","Google Shopping / Custom label 1",
    "Google Shopping / Custom label 2","Google Shopping / Custom label 3",
    "Google Shopping / Custom label 4"
];


// Limpia texto para CSV (quita comas y saltos)
function clean(text) {
    if (!text) return "";
    return text.replace(/,/g, " ").replace(/\n/g, " ").trim();
}

// Función principal
async function generateCSV() {
    try {
        await sequelize.authenticate();
        console.log("📦 Conectado a MySQL");

        // Obtiene solo los productos que tienen al menos 1 imagen
        const products = await DiscordProduct.findAll({
            where: sequelize.literal("JSON_LENGTH(images) > 0")
        });

        console.log(`📊 Productos encontrados: ${products.length}`);

        let csv = SHOPIFY_COLUMNS.join(",") + "\n";
        let index = 1;

        for (const p of products) {
            const images = p.images || [];
            const firstImage = images.length > 0 ? images[0] : "";

            const row = {
                "Title": clean(p.content.split("\n")[0]),
                "URL handle": "",
                "Description": clean(p.content),
                "Vendor": "TENGOFE",
                "Product category": CHANNEL_CATEGORY[p.channelId] || "Otros",
                "Type": "",
                "Tags": CHANNEL_CATEGORY[p.channelId] || "otros",
                "Published on online store": "TRUE",
                "Status": "active",
                "SKU": "",
                "Barcode": "",
                "Option1 name": "",
                "Option1 value": "",
                "Option2 name": "",
                "Option2 value": "",
                "Option3 name": "",
                "Option3 value": "",
                "Price": p.price ?? "",
                "Compare-at price": "",
                "Cost per item": "",
                "Charge tax": "TRUE",
                "Tax code": "",
                "Unit price total measure": "",
                "Unit price total measure unit": "",
                "Unit price base measure": "",
                "Unit price base measure unit": "",
                "Inventory tracker": "",
                "Inventory quantity": "",
                "Inventory policy": "continue",
                "Continue selling when out of stock": "",
                "Weight value (grams)": "",
                "Weight unit for display": "",
                "Requires shipping": "FALSE",
                "Fulfillment service": "manual",
                "Product image URL": firstImage,
                "Image position": index,
                "Image alt text": "",
                "Variant image URL": "",
                "Gift card": "FALSE",
                "SEO title": "",
                "SEO description": "",
                "Google Shopping / Google product category": "",
                "Google Shopping / Gender": "",
                "Google Shopping / Age group": "",
                "Google Shopping / MPN": "",
                "Google Shopping / AdWords Grouping": "",
                "Google Shopping / AdWords labels": "",
                "Google Shopping / Condition": "",
                "Google Shopping / Custom product": "",
                "Google Shopping / Custom label 0": "",
                "Google Shopping / Custom label 1": "",
                "Google Shopping / Custom label 2": "",
                "Google Shopping / Custom label 3": "",
                "Google Shopping / Custom label 4": ""
            };

            index++;

            // Construir fila CSV respetando el orden
            const csvRow = SHOPIFY_COLUMNS.map(col => row[col] ?? "").join(",");
            csv += csvRow + "\n";
        }

        // Guardar archivo CSV
        const fileName = "shopify_products.csv";
        fs.writeFileSync(fileName, csv, "utf8");

        console.log("🎉 CSV generado con éxito →", fileName);

    } catch (err) {
        console.error("❌ Error generando CSV:", err);
    }
}

generateCSV();