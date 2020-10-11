// This command requires the discord-js package to create embeds
const Discord = require('discord.js');
const { id_DiscordGarden, id_DiscordBackground } = require('../config.json');
let { id_random } = require('../config.json');

exports.run = async (client, message) => {

    if (message.guild.id === id_DiscordGarden) { id_random = client.channels.get('449312787563544576') }
	else if (message.guild.id === id_DiscordBackground) { id_random = client.channels.get('470343795775373333') }
	else if (client.channels.find(c => c.name === 'random')) { id_random = client.channels.find(c => c.name === 'random') };

    var Random = new Discord.RichEmbed()
			.setColor('#007f47')
			.setDescription(id_random)
			.setImage('https://gardenmc.fr/img/random.png')

	message.channel.send(Random);

}