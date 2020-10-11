// This command requires the discord-js package to create embeds
const Discord = require('discord.js');
const { prefix, prefix2, id_DiscordGarden } = require('../config.json');

exports.run = async (client, message) => {

if(message.guild.id === id_DiscordGarden) {
    var dot = '<:greendot:564534435039412234>';
} else {
    var dot = '• ';
}
    const how = new Discord.RichEmbed()     
    .setColor('#007f47')
    .setTitle('📊 Comment faire un sondage :')
    // Aide sondages
    .setDescription(`${dot}**Oui / Non / Pas d'avis**
    ${prefix}poll "Aimez-vous la glace à la vanille ?"  *(avec guillements)*
    *ou*
    ${prefix2}poll Aimez-vous la glace à la vanille ?  *(sans guillemets)*

    ${dot}**Question à choix multiples (1-20)**
    ${prefix}poll "Quelle est votre couleur préférée ?" "Bleu" "Rouge" "Jaune"`)
    //.setDescription(`**Oui / Non / Pas d'avis** \n ${prefix}poll tp à la couche 256 quand on tombe dans l'End ?`)
    .setFooter('')

message.channel.send(how);

}