const express = require("express");
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const config = require("./config.json");
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

// ======= Servidor Web para Replit / UptimeRobot =======
const app = express();
app.get("/", (req, res) => {
    res.send("¡El bot está activo!");
});
app.listen(3000, () => {
    console.log("Servidor web funcionando en el puerto 3000");
});
// =======================================================

const client = new Client({
    intents: Object.values(GatewayIntentBits),
    partials: Object.values(Partials),
});

client.commands = new Collection();

// ================= ALERTA DE CANALES ===================
const ALERT_CHANNEL_ID = '1408871845586927746'; // Canal de contador-tickets
const ALERT_TAG = '<@&ID_DEL_ROL>'; // o <@ID_DEL_USUARIO> según lo que quieras

async function checkChannelLimit(guild) {
    const channelCount = guild.channels.cache.size;

    if (channelCount >= 380 && channelCount < 400) {
        const alertChannel = guild.channels.cache.get(ALERT_CHANNEL_ID);
        if (alertChannel) {
            alertChannel.send(`${ALERT_TAG} ⚠️ El servidor ya tiene **${channelCount}** canales, estamos cerca del límite de 400.`);
        }
    }
}

client.on("channelCreate", channel => {
    checkChannelLimit(channel.guild);
});

client.on("channelDelete", channel => {
    checkChannelLimit(channel.guild);
});
// =======================================================
