// /Events/Client/channelDelete.js
const { Events, EmbedBuilder } = require("discord.js");
const LOG_CHANNEL_ID = "1436017102179008685";

module.exports = {
    name: Events.ChannelDelete,
    async execute(channel) {
        if (!channel.guild) return;

        const logChannel = await channel.client.channels.fetch(LOG_CHANNEL_ID);

        // Obtener mensajes almacenados
        const messages = channel.client.ticketMessages?.get(channel.id) || [];

        const uniqueUsers = [...new Set(messages.map(m => m.author))];

        const embed = new EmbedBuilder()
            .setTitle("🗑️ Canal Eliminado")
            .setDescription(`**Nombre del canal:** ${channel.name}\n**ID del canal:** ${channel.id}`)
            .addFields([
                {
                    name: "Usuarios que participaron",
                    value: uniqueUsers.length > 0
                        ? uniqueUsers.map(u => `• ${u}`).join("\n")
                        : "Nadie había enviado mensajes."
                },
                {
                    name: "Último mensaje",
                    value: messages.length > 0
                        ? `${messages[messages.length - 1].author}: ${messages[messages.length - 1].content}`
                        : "Ninguno"
                }
            ])
            .setColor(0xff0000)
            .setTimestamp(new Date());

        await logChannel.send({ embeds: [embed] });

        // Limpiar memoria del canal eliminado
        channel.client.ticketMessages?.delete(channel.id);
    }
};
