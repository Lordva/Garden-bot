const Discord = require('discord.js'); // We need this to form & send embeds.
const { prefix } = require('../config.json');

// Command Handler
exports.run = async (client, message, args) => {

    var Help = new Discord.RichEmbed()
			.setColor('#007f47')
			.setTitle('Liste des commandes du Garden Bot')
			.setThumbnail('https://cdn.discordapp.com/attachments/564470395437056010/573542873685950485/Gardenlogo_v3.png')
			.setDescription("`" + prefix + "site` **:** Adresse du site de Garden\n" +
			"`"+ prefix + "ip` **:** L'IP du serveur\n" +
			"`"	+ prefix + "version` **:** Version du serveur\n" +
			"`"	+ prefix + "seed` **:** Seed du serveur survie\n" +
			"`"	+ prefix + "crafts`/`"+ prefix + "craft list` **:** Voir la liste des crafts personnalisés\n" +
			"`"	+ prefix + "craft <nom>` **:** Voir la recette d'un craft en particulier\n" +
			"`"	+ prefix + "link` **:** Comment lier son compte Discord à son compte Minecraft\n\n"  +

			"`"	+ prefix + "vote` **:** Lien vers la page de vote\n"  +
			"`"	+ prefix + "utip` **:** Utip de Garden \n"  +
			"`"	+ prefix + "wiki` **:** Wiki de Garden\n" +
			"`"	+ prefix + "twitter` **:** Twitter de Garden \n"  +
			"`" + prefix + "staff` **:** La liste du staff \n\n" +
			"`" + prefix + "join <name>` **:** Date a laquelle le joueur a rejoint le discord\n" +

			"`"	+ prefix + "poll` **:** Faire un sondage \n"+
			"`"	+ prefix + "team` **:** Gestion des teams \n" +
			"`"	+ prefix + "rappel` **:** Créer un rappel \n" +
			"`" + prefix + "help` **:** Cette commande, duh.")
			
			.setFooter('');
		message.channel.send(Help)

}