const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('transferencia2')
        .setDescription('Te muestra los datos para hacer una transferencia a través de Remitly'),
    execute(interaction) {
        interaction.reply({
            content: "🏦 Para transferencia a través de Remitly:\n\n**Banco**: Citibanamex\n**Número de cuenta**: `002760702103548652`\n**Nombre**: Ernesto Morales\n**Segundo Apellido**: Hirales\n**Estado**: Baja California Sur\n**Ciudad**: La Paz\n**Número**: 612 288 1167",
        });
    }
};
