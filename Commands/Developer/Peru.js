const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('metodospago')
        .setDescription('Te muestra los métodos de pago disponibles'),
    execute(interaction) {
        interaction.reply({
            content: "Métodos de pago disponibles:\n\n**Yape, Plin**\nNúmero: `913388525`\n**Nombre**: Jefferson A. Gonzalez Escate\n**Banco**: BCP\n\n**Transferencia Perú**\nNúmero: `38074647088059`\n**Nombre**: Jefferson Gonzalez\n**Banco**: BCP",
        });
    }
};
