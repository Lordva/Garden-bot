// This commands requires 1 package
const Discord = require('discord.js'); // We need this to form & send embeds.

// Command Handler
exports.run = async (client, message, args) => {

    const useruser = 'Commande demandée par: ' + message.author.username;
    const userurl = message.author.avavtarURL;

    // Forming the embed
    let embed = new Discord.RichEmbed()
        .setColor('#bb2d2d')
        .setDescription(`En attente de la réponse...`)
        .setTimestamp()
    message.channel.send(embed).then(message => {
        embed.setColor('#007f47')
        embed.setDescription(`:ping_pong: Pong! **\`${client.pings[0]}ms\`**`)
        embed.setFooter(useruser, userurl)
        embed.setTimestamp()
        message.edit(embed)
    })

} 
