// This command requires the discord-js package to create embeds
const Discord = require('discord.js');
const { id_DiscordGarden, id_Animateur, id_AnimateurTest, id_BlindTest, id_Bot, id_Visiteur} = require('../config.json');

exports.run = async (client, message, args) => {

//Check if it is the right server
//if(message.guild.id !== id_DiscordGarden) return;

var SalonEvents = "541002809408225281";
var SalonEventsCategoryName = "Salons Équipes";

Couleurs = { 
    color: [
        {
            id: 1,
            name: 'Bleue',
            emoji: '🔵',
        },
        {
            id: 2,
            name: 'Rouge',
            emoji: '🔴',
        },
        {
            id: 3,
            name: 'Verte',
            emoji: '🟢',
        },
        {
            id: 4,
            name: 'Jaune',
            emoji: '🟡',
        },
        {
            id: 5,
            name: 'Violette',
            emoji: '🟣',
        },
        {
            id: 6,
            name: 'Orange',
            emoji: '🟠',
        },
        {
            id: 7,
            name: 'Marron',
            emoji: '🟤',
        },
        {
            id: 8,
            name: 'Grise',
            emoji: '⚫',
        }
    ]};

    ///Création salon vocal
    function Equipe(Emoji, Nom) {
        message.guild.createChannel(Emoji+` Équipe `+Nom, 'voice').then(
        (voc) => {
            voc.setParent(message.guild.channels.find(e=> e.name === SalonEventsCategoryName).id)
                }
        )
    }

    if (message.member.roles.find(x=> x.id === id_Animateur) || message.member.roles.find(x=> x.id === id_AnimateurTest) || message.member.hasPermission(['MANAGE_ROLES','MANAGE_CHANNELS'])) {
    
    if(!args[0]) return;

if(Number(args[0]) <= Couleurs.color.length && Number(args[0]) > 0) {
    if (!message.guild.channels.find(e=> e.name === SalonEventsCategoryName)) { message.guild.createChannel(SalonEventsCategoryName, 'category').then((cat) => {cat.setPosition(24)}) }
    for (let i = 0; i < Number(args[0]); i++) {
            Equipe(Couleurs.color[i].emoji, Couleurs.color[i].name);
    }

}

        if (args[0].toLowerCase() === "off") {
            for (let i = 0; i < Couleurs.color.length; i++) {
            try{
                message.guild.channels.find(x => x.name ===  Couleurs.color[i].emoji+` Équipe `+Couleurs.color[i].name).delete();
            } catch (e) {};
            }
            try {message.guild.channels.find(e=> e.name === SalonEventsCategoryName).delete();} catch(e) {};
        }

    } else return Embed0(`:no_entry: Erreur : permissions`, `Vous n'avez pas les permissions pour faire cela.`);
}