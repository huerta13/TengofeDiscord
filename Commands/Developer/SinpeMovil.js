const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('transferencia3')
        .setDescription('Te muestra los datos para hacer una transferencia a través de Sinpe móvil'),
    execute(interaction) {
        interaction.reply({
            content: "🏦 Para transferencia a través de Sinpe Móvil:\n\n**Número**: `72850251`\n**A nombre de**: Leonardo Bonilla Carrillo",
        });
    }
};
