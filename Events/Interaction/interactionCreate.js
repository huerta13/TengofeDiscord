const config = require('../../config.json');

module.exports = {
    name: 'interactionCreate', // ✅ minúsculas
    async execute(interaction, client) { // ✅ async
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            return interaction.reply({ content: "❌ Comando deshabilitado", ephemeral: true });
        }

        if (command.developer && interaction.user.id !== config.developer) {
            return interaction.reply({ content: "⚠️ Comando solo para developers", ephemeral: true });
        }
        
        try {
            await command.execute(interaction, client); // ✅ await
        } catch (error) {
            console.error(`Error al ejecutar el comando ${interaction.commandName}:`, error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "❌ Hubo un error ejecutando el comando.", ephemeral: true });
            } else {
                await interaction.reply({ content: "❌ Hubo un error ejecutando el comando.", ephemeral: true });
            }
        }
    }
};
