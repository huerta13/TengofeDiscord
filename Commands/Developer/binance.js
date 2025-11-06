const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('binanceid')
        .setDescription('Te proporciona el ID de Binance'),
    execute(interaction) {
        interaction.reply({
            content: "Tu **Binance ID** es: `423710875`.",
        });
    }
};
