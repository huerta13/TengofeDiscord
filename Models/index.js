const DiscordProducts = require("./DiscordProducts");
const ShopifyProduct = require("./ShopifyProduct");

const sequelize = require("./Database/database");
const { DiscordPost, ShopifyProduct } = require("./Models");

sequelize.sync({ alter: true })
    .then(() => console.log("📌 Tablas sincronizadas con Sequelize"))
    .catch(err => console.error(err));

// Relación 1 a 1
DiscordPost.hasOne(ShopifyProduct, {
    foreignKey: "discord_id",
    onDelete: "CASCADE"
});

ShopifyProduct.belongsTo(DiscordPost, {
    foreignKey: "discord_id"
});

module.exports = {
    DiscordProducts,
    ShopifyProduct
};


client.on("messageCreate", async (message) => {
    try {
        // ❌ Ignorar mensajes del bot
        if (message.author.bot) return;

        // ❌ Evitar guardar mensajes sin contenido y sin imágenes
        if (!message.content && message.attachments.size === 0) return;

        // ✔ EXTRAER TEXTO
        const content = message.content || null;

        // ✔ EXTRAER TODAS LAS IMÁGENES
        const images = [];
        if (message.attachments.size > 0) {
            message.attachments.forEach(a => {
                if (a.contentType && a.contentType.startsWith("image")) {
                    images.push(a.url);
                }
            });
        }

        // ✔ GUARDAR EN LA BASE DE DATOS
        await DiscordPost.create({
            id: message.id,
            author_id: message.author.id,
            channel_id: message.channel.id,
            content: content,
            images: images.length > 0 ? images : null,
            created_at: new Date(message.createdTimestamp),
            updated_at: null
        });

        console.log(`💾 Guardado mensaje ${message.id} en MySQL`);

    } catch (err) {
        console.error("❌ Error guardando mensaje:", err);
    }
});

