// This command requires the discord-js package to create embeds
const Discord = require('discord.js');
const fs = require('fs');
var Craftlist = fs.readFileSync("crafts.json");
var CraftContent = JSON.parse(Craftlist);
var path = require('path');

exports.run = async (client, message, args) => {

function Embed0(Title, Description) {
    var Embed = new Discord.RichEmbed()
        .setColor('#c1694f')
		.setTitle(Title)
		.setDescription(Description)
	message.channel.send(Embed)
}

if (!args[0] || args[0] === `list`) {

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
    //console.log(Liste_block);
    }
    
else if(args[0] === `reload`) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const craft_path = './img/crafts/';
    let types = ["block", "item"];
    var Liste = {};
    Liste.crafts = [];

    types.forEach(i => 
        fs.readdir(craft_path+i+"/", function (err, files) {
            try {
                files.forEach(function(file) {
                //console.log(files[i]);
                var jsonData = {
                    id: Liste.crafts.length,
                    name: path.basename(file, path.extname(file)),
                    type: i,
                    extension: path.extname(file),
                    path: craft_path+i+"/"+path.basename(file),
                    text: ''};
                Liste.crafts.push(jsonData);
                //console.log(jsonData);
                // parse json
                //var jsonObj = JSON.parse(jsonData);
                //console.log(jsonObj);
                })
            } catch(err) {
                console.error(err);
            }
            //console.log(files);
            var jsonContent = JSON.stringify(Liste);
            //console.log(jsonContent);
            fs.writeFile("crafts.json", jsonContent, 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
            })
            //console.log(Liste);
        })
    )
    message.channel.send('Liste des crafts actualisée :white_check_mark:');
} else {
	try {
		//console.log(CraftContent.crafts);
		for (var i=0; i < CraftContent.crafts.length; i++) {
			if(CraftContent.crafts[i].name.toLowerCase() === args[0].toLowerCase()) {
                message.channel.send('', {
                    file: CraftContent.crafts[i].path
                });
			}
		}
	} catch(err) {
		console.error(err)
	}}
//    if(message.guild.id !== id_DiscordGarden) return;

	}