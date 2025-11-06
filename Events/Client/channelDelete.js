// /Events/Client/channelDelete.js
const { Events, EmbedBuilder } = require("discord.js");
const LOG_CHANNEL_ID = "1436017102179008685"; // Cambia por tu canal de logs

module.exports = {
    name: Events.ChannelDelete,
    async execute(channel) {
        if (!channel.guild) return;

        const logChannel = await channel.client.channels.fetch(LOG_CHANNEL_ID);
        if (!logChannel) return console.error("❌ No se encontró el canal de logs");

        // Obtener mensajes guardados
        const messages = channel.client.ticketMessages?.get(channel.id) || [];

        // Usuarios únicos
        const uniqueUsers = [...new Set(messages.map(m => m.author))];

        // Último mensaje
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

        const embed = new EmbedBuilder()
            .setTitle("🗑️ Canal Eliminado")
            .setDescription(`**Nombre del canal:** ${channel.name}\n**ID del canal:** ${channel.id}`)
            .addFields(
                {
                    name: "Usuarios que participaron",
                    value: uniqueUsers.length > 0
                        ? uniqueUsers.map(u => `• ${u}`).join("\n")
                        : "Nadie había enviado mensajes."
                },
                {
                    name: "Último mensaje",
                    value: lastMessage
                        ? `${lastMessage.author}: ${lastMessage.content}`
                        : "Ninguno"
                }
            )
            .setColor(0xff0000)
            .setTimestamp(new Date());

        await logChannel.send({ embeds: [embed] });

        // Limpiar memoria del canal eliminado
        channel.client.ticketMessages?.delete(channel.id);

        console.log(`✅ Canal eliminado registrado: ${channel.name}`);
    }
};
