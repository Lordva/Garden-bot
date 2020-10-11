const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("vous ne pouvez pas utiliser cette commande.");
    if(!args[0]) return message.channel.send('Veuillez préciser le nombre de messages à supprimer.');

var nb = Number(args[0]);
var nb1 = nb + 1;

    message.channel.bulkDelete(nb1).then(() => { 
        if (nb === 1) {
            message.channel.send(`:pencil2: **${nb}** message supprimé.`).then(msg => msg.delete(5000));
        }
        else{
        message.channel.send(`:pencil2: **${nb}** messages supprimés.`).then(msg => msg.delete(5000));
    }});

}