// This command requires the discord-js package to create embeds
const { Discord, Attachment } = require('discord.js');
const fs = require('fs');
var path = require('path');
const { id_DiscordGarden, id_Fondateur, id_Administrateur, id_Moderateur, id_Helper, id_Animateur, id_RespBuilder, id_Builder, id_Staff } = require('../config.json');

exports.run = async (client, message, args) => {

const craft_path = './img/crafts/';
let types = ["block", "item"];
var Liste = {}
Liste.crafts = []
id = []

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
            
            console.log(Liste)
            //console.log(jsonData);
            // parse json
            //var jsonObj = JSON.parse(jsonData);
            //console.log(jsonObj);
            })
    } 
    catch(err) {
            console.error(err);
        }
        //console.log(files);
                // stringify JSON Object
                var jsonContent = JSON.stringify(Liste);
                //console.log(jsonContent);
    
                fs.writeFile("crafts.json", jsonContent, 'utf8', function (err) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        return console.log(err);
                    }
    
                    //console.log("JSON file has been saved.");
                })}))
};