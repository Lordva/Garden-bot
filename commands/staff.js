const Discord = require('discord.js'); // We need this to form & send embeds.
const { id_DiscordGarden, id_Fondateur, id_Administrateur, id_RespModerateur, id_Moderateur, id_Helper, id_RespAnimateur, id_Animateur, id_RespBuilder, id_Builder, id_Staff } = require('../config.json');

// Command Handler
exports.run = async (client, message, args) => {

    if(message.guild.id !== id_DiscordGarden) return;
var blank = "⠀"
	
let Staff = message.guild.roles.get(id_Staff).members.map(m=>m.user.id);
var Fondateur = Array();
var Administrateur = Array();
var Moderateur = Array();
var Helper = Array();
var Animateur = Array();
var Builder = Array();
var Reste = Array();
	
	for (var i = 0; i < Staff.length; i++) {
		if (message.guild.member(Staff[i]).roles.has(id_Fondateur)) {
			Fondateur.push(` <@${Staff[i]}>`)
		} else if (message.guild.member(Staff[i]).roles.has(id_Administrateur)) {
			Administrateur.push(` <@${Staff[i]}>`)
		} else if(message.guild.member(Staff[i]).roles.has(id_RespModerateur)) {
			Moderateur.unshift(` <@${Staff[i]}> (resp.)`)
		} else if(message.guild.member(Staff[i]).roles.has(id_Moderateur)) {
			Moderateur.push(` <@${Staff[i]}>`)
		} else if (message.guild.member(Staff[i]).roles.has(id_Helper)) {
			Helper.push(` <@${Staff[i]}>`)
		} else if (message.guild.member(Staff[i]).roles.has(id_RespAnimateur)) {
			Animateur.unshift(` <@${Staff[i]}> (resp.)`)
		} else if (message.guild.member(Staff[i]).roles.has(id_Animateur)) {
			Animateur.push(` <@${Staff[i]}>`)
		} else if (message.guild.member(Staff[i]).roles.has(id_RespBuilder)) {
			Builder.unshift(` <@${Staff[i]}> (resp.)`)
		} else if (message.guild.member(Staff[i]).roles.has(id_Builder)) {
			Builder.push(` <@${Staff[i]}>`)
		} 
		else Reste.push(` <@${Staff[i]}>`);
	}
	const F = message.guild.roles.get(id_Fondateur).name
	const descAdministrateur = "S'occupent de gérer le serveur (financement, développement, configuration, etc.) et les équipes de modérateurs/helpers"
	const descModerateur = "Réglent les conflits et s'occupent des candidatures"
	const descHelper = "Acceuillent les nouveaux membres et s'occupent des candidatures"
	const descAnimateur = "Créent et encadrent les évènements"
	const descBuilder = "Construisent pour les besoins des administrateurs et des animateurs"
	var descReste = "... et les autres :)"

if(Reste.length = 0) { descReste = '' };

	var EStaff = new Discord.RichEmbed()
	.setColor('#007f47')
	.setTitle("**L'équipe**")
	.setURL('http://gardenmc.fr/stats/')
	//.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	//.setDescription('Some description here')
	//.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addField(`**${message.guild.roles.get(id_Fondateur).name}**`, `${String(Fondateur)}\n${blank}`)
	.addField(`**${message.guild.roles.get(id_Administrateur).name}s**`, `${descAdministrateur}\n${String(Administrateur)}\n${blank}`)
	.addField(`**${message.guild.roles.get(id_Moderateur).name}s**`, `${descModerateur}\n${String(Moderateur)}\n${blank}`)
	.addField(`**${message.guild.roles.get(id_Helper).name}s**`, `${descHelper}\n${String(Helper)}\n${blank}`)
	.addField(`**${message.guild.roles.get(id_Animateur).name}s**`, `${descAnimateur}\n${String(Animateur)}\n${blank}`)
	.addField(`**${message.guild.roles.get(id_Builder).name}s**`, `${descBuilder}\n${String(Builder)}\n${blank}`)
	.addField(descReste, `${String(Reste)}\n${blank}`)
	//.addBlankField()
	//.setImage('')
	.setTimestamp()
	//.setFooter('', '');
message.channel.send(EStaff);
//console.log("Commande staff effectuée");
}