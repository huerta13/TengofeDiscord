// /Events/Client/messageCreate.js
const { Events } = require("discord.js");

// Map global para almacenar mensajes por canal
const ticketMessages = new Map();

module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        if (!message.guild) return;
        if (!message.channel.name.startsWith("ticket-")) return; // Solo tickets

        // Inicializar array si no existe
        if (!ticketMessages.has(message.channel.id)) {
            ticketMessages.set(message.channel.id, []);
        }

        // Guardar mensaje
        ticketMessages.get(message.channel.id).push({
            author: message.author.tag,
            content: message.content
        });

        // Mantener máximo 100 mensajes por canal
        if (ticketMessages.get(message.channel.id).length > 100) {
            ticketMessages.get(message.channel.id).shift();
        }

        // Guardar Map en client para acceso desde channelDelete
        message.client.ticketMessages = ticketMessages;
    }
};
