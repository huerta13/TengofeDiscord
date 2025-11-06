const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('chile1')
        .setDescription('Muestra los datos para transferencia en Chile'),
    async execute(interaction) {
        await interaction.reply({
            content:
`🇨🇱 **Transferencia Chile - Banco Chile**
👤 Nombre: Diego Farias
🆔 RUT: 22.892.502-0
🏦 Banco: Banco Chile
💳 Tipo de cuenta: Cuenta Vista
📄 Nº Cuenta: 07-122-02111-04
📧 Correo: diegocindy100@gmail.com`
        });
    }
};
