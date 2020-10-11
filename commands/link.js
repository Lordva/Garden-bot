const Discord = require('discord.js'); // We need this to form & send embeds.
const { GardenBot_id } = require('../config.json');

// Command Handler
exports.run = async (client, message, args) => {

    var Link = new Discord.RichEmbed()
			.setColor('#007f47')
			.setTitle(':left_right_arrow: Lier son compte Minecraft à son compte Discord')
            .setDescription("Suivre ces deux étapes :\n**1.** Taper la commande `/discord link` sur le serveur survie\n**2.** Vous allez recevoir dans le chat un code à 4 chiffres qu'il faut envoyer au "+`<@${GardenBot_id}>`+" en message privé\nEt voilà !")
			.setFooter('');
		message.channel.send(Link)
}
