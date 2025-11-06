const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('thalinss')  // Cambié la "T" mayúscula a minúscula
        .setDescription('Informacion de thalin'),
    execute(interaction) {
        interaction.reply({
            content: "THalin colombiano malparido",
        });
    }
};

