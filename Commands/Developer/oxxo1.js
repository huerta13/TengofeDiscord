const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('oxxo1')
        .setDescription('Te muestra los datos para depositar en OXXO'),
    execute(interaction) {
        interaction.reply({
            content: "💳 Para depositar en **Oxxo**:\n\n**Spin**: `4217 4700 9154 2437`\n**Nombre**: Francisco Javier Ramírez Reynoso",
            
        });
    }
};
