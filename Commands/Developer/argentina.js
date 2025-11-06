const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('transferenciaarg')
        .setDescription('Te proporciona los datos para hacer una transferencia a través de Lemon Cash en Argentina'),
    execute(interaction) {
        interaction.reply({
            content: "🏦 Para transferencia en Argentina a través de Lemon Cash:\n\n**Banco**: Lemon Cash\n**Titular**: Luciano Mamani Torres\n**Alias**: `LucianokUtz.lemon3`",
        });
    }
};
