const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('nequi1')
        .setDescription('Muestra los datos para pago por Nequi (Colombia)'),
    async execute(interaction) {
        await interaction.reply({
            content: '🇨🇴 **Pago por Nequi**\n📱 Número: `3225397542`\n👤 Nombre: Gabby Arnold'
        });
    }
};
