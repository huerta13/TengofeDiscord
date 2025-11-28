const express = require("express");
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const config = require("./config.json");
const sequelize = require("./database");

// Tu lógica separada
const { procesarMensaje, borrarProducto } = require("./discordWatcher");

// ===============================
//        BASE DE DATOS
// ===============================
sequelize.sync()
    .then(() => console.log("📦 Base de datos sincronizada"))
    .catch(err => console.error("❌ Error BD:", err));

// ===============================
//        SERVIDOR WEB
// ===============================
const app = express();

app.get("/", (req, res) => res.send("Bot activo 🚀"));

app.listen(3000, () => {
    console.log("🌐 Servidor web en puerto 3000");
});


// ===============================
//           BOT DISCORD
// ===============================
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message,
        Partials.Channel
    ]
});

client.commands = new Collection();

// ===============================
//        CANALES A VIGILAR
// ===============================
const CHANNELS_TO_WATCH = [
    "1389358951480561745",
    "1393294587409334322",
    "1393294722985885746",
    "1393318889894449342",
    "1393294754187444294"
];

// ===============================
//     MENSAJES NUEVOS = CREAR
// ===============================
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!CHANNELS_TO_WATCH.includes(message.channel.id)) return;

    try {
        await procesarMensaje(message);
    } catch (err) {
        console.error("❌ Error procesando mensaje:", err);
    }
});

// ===============================
//     MENSAJES BORRADOS = VENDIDO
// ===============================
client.on("messageDelete", async (message) => {
    if (!message?.id) return;
    if (!CHANNELS_TO_WATCH.includes(message.channelId)) return;

    try {
        await borrarProducto(message);
    } catch (err) {
        console.error("❌ Error al eliminar producto:", err);
    }
});

// ===============================
//           READY
// ===============================
client.once("ready", () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
});

// ===============================
//         LOGIN
// ===============================
client.login(config.token)
    .then(() => console.log("🔹 Conectando bot..."))
    .catch(err => console.error("❌ Error Discord:", err));