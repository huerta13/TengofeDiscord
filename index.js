const express = require("express");
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const config = require("./config.json");
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

// ======= Servidor Web =======
const app = express();
app.get("/", (req, res) => {
    res.send("¡El bot está activo!");
});
app.listen(3000, () => {
    console.log("Servidor web funcionando en el puerto 3000");
});
// ============================

const client = new Client({
    intents: Object.values(GatewayIntentBits),
    partials: Object.values(Partials),
});

client.commands = new Collection();

// ================= ALERTA DE CANALES ===================
const ALERT_CHANNEL_ID = '1408871845586927746';
const ALERT_TAG = '<@&ID_DEL_ROL>'; 

async function checkChannelLimit(guild) {
    const channelCount = guild.channels.cache.size;

    if (channelCount >= 380 && channelCount < 400) {
        const alertChannel = guild.channels.cache.get(ALERT_CHANNEL_ID);
        if (alertChannel) {
            alertChannel.send(`${ALERT_TAG} ⚠️ El servidor ya tiene **${channelCount}** canales, estamos cerca del límite de 400.`);
        }
    }
}

client.on("channelCreate", channel => checkChannelLimit(channel.guild));

client.on("ready", async () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);

    // ✅ Cargar comandos aquí (después del login)
    await loadCommands(client);
});

// =======================================================

// ✅ Cargar solo los eventos (no los comandos aún)
loadEvents(client);

// ✅ Iniciar sesión en Discord
client.login(config.token)
    .then(() => console.log("🔹 Iniciando sesión en Discord..."))
    .catch(err => console.error("❌ Error al iniciar sesión:", err));

