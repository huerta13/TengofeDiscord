const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('transferencia1')
        .setDescription('Te muestra los datos para hacer una transferencia'),
    execute(interaction) {
        interaction.reply({
            content: "🏦 Para transferencia bancaria:\n\n**Banco**: Inbursa\n**CLABE**: `0363 2050 0731 3349 30`\n**Nombre**: Francisco Javier Ramírez Reynoso",
            
        });
    }
};
