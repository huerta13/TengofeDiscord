const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ctickets")
        .setDescription("Muestra el número de canales de tickets en el servidor"),

    async execute(interaction) {
        const guild = interaction.guild;
        if (!guild) return interaction.reply("❌ No se pudo acceder al servidor.");

        // Filtrar canales con el nombre que contenga "ticket"
        const ticketChannels = guild.channels.cache.filter(
            ch => ch.name.includes("ticket")
        );

        await interaction.reply(`🎟️ Actualmente hay **${ticketChannels.size}** canales de tickets en el servidor.`);
    },
};
