const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('transferencia4')
        .setDescription('Te muestra los datos para hacer una transferencia a través del Banco Pichincha'),
    execute(interaction) {
        interaction.reply({
            content: "🏦 Para transferencia a través del Banco Pichincha:\n\n**Banco**: Pichincha\n**Tipo de cuenta**: Cuenta de ahorro transaccional\n**Número de cuenta**: `2212265577`\n**Cédula**: `1317699856`\n**Nombre**: Leandro Adolfo Davila Zambrano",
        });
    }
};
