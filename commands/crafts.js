// This command requires the discord-js package to create embeds
const Discord = require('discord.js');
const fs = require('fs');
var Craftlist = fs.readFileSync("crafts.json");
var CraftContent = JSON.parse(Craftlist);

exports.run = async (client, message, args) => {

function Embed0(Title, Description) {
    var Embed = new Discord.RichEmbed()
        .setColor('#c1694f')
		.setTitle(Title)
		.setDescription(Description)
	message.channel.send(Embed)
}
Liste_block = Array();
Liste_item = Array();

for (var i=0; i < CraftContent.crafts.length; i++) {
	if(CraftContent.crafts[i].type === "block") {
	Liste_block.push(` ${CraftContent.crafts[i].name}`)
}
if(CraftContent.crafts[i].type === "item") {
	Liste_item.push(` ${CraftContent.crafts[i].name}`)
	}
}

Embed0(':bricks: Liste des crafts personnalisés',
		`**BLOCS** \n ${String(Liste_block)} \n\n 
		**ITEMS** \n ${String(Liste_item)} \n\n
		__Topic complet :__ **<https://gardenmc.fandom.com/fr/wiki/Crafts_ajoutés>**`);
}