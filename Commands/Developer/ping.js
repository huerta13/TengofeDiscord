const {SlashCommandBuilder} = require ('discord.js')

module.exports = {

    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Te retorna pong'),
    execute(interaction){
        interaction.reply({content:"Pong"});
    }
};


