const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('pagospendientes')
        .setDescription('Te muestra los requisitos para recibir tu pago'),
    execute(interaction) {
        interaction.reply({
            content: "Para poder pagar tu cuenta necesitamos lo siguiente:\n\n1. Video de tu cara con el DNI/CÉDULA/INE (o documento oficial de tu país) en la mano diciendo: 'Hola, soy [tu nombre], mi usuario de Discord es [tu usuario de Discord], vendí mi cuenta de [el juego que vendiste] con la cantidad de [las skins u objetos que tenía tu cuenta] por la cantidad de [el precio que acordamos] y yo no haré revert a la cuenta.'\n2. Foto de tu DNI/CÉDULA/INE, ambos lados (o documento oficial de tu país).\n3. Tu número de teléfono.\n\n⚠ Recuerda que si eres menor de edad, lo pueden enviar tus padres como se te pide. ⚠",
        });
    }
};
