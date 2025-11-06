const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('vinculacion')
        .setDescription('Te muestra los pasos para vincular tu cuenta de Fortnite'),
    execute(interaction) {
        interaction.reply({
            content: "Para vincular tu cuenta de Fortnite, sigue estos pasos:\n\n1. Crea un perfil nuevo de tu plataforma con un correo diferente al que te di.\n2. Entra a Fortnite y selecciona 'VINCULAR CUENTA'.\n3. Ingresa el código que te aparece en pantalla en este enlace: https://www.epicgames.com/id/activate.\n4. Inicia sesión con la cuenta que te proporcioné y ¡listo!",
        });
    }
};
