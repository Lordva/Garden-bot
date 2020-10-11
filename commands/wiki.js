const Discord = require('discord.js'); // We need this to form & send embeds.

// Command Handler
exports.run = async (client, message, args) => {
    if(!args[0]) {
        message.channel.send(`**Garden Wiki : <https://gardenmc.fandom.com/fr/wiki/Accueil>**`)
    }
    else {
        for (var i = 0; i < args.length; i++) {
            args[i] = args[i].charAt(0).toUpperCase() + args[i].slice(1);
            }
        var Q = args.join('+');
        message.channel.send(`https://gardenmc.fandom.com/fr/wiki/Spécial:Recherche?query=${Q}&navigationSearch=true`)
    }
}