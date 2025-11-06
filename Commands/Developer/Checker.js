const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('telegram')
        .setDescription('Te proporciona el enlace para acceder al bot de Telegram TengoFeSkinnchecker'),
    execute(interaction) {
        interaction.reply({
            content: "Puedes acceder al bot de Telegram *TengoFeSkinnchecker* aquí: [https://t.me/TengoFeSkinnchecker_bot](https://t.me/TengoFeSkinnchecker_bot).",
        });
    }
};
