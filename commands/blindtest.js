// This command requires the discord-js package to create embeds
const Discord = require('discord.js');
const { id_DiscordGarden, id_Animateur, id_AnimateurTest, id_BlindTest, id_Bot, id_Visiteur} = require('../config.json');

exports.run = async (client, message, args) => {

//Check if it is the right server
if(message.guild.id !== id_DiscordGarden) return;

const id_CategoryBlindTest = "576712011681890315";
const id_BotBlindTest = "415062217596076033"; ///Rythm Octa

    function Embed0(Title, Description) {
        var Embed = new Discord.RichEmbed()
            .setColor('#c1694f')
            .setTitle(Title)
            .setDescription(Description)
        message.channel.send(Embed)
    }

    if (message.member.roles.find(x=> x.id === id_Animateur) || message.member.roles.find(x=> x.id === id_AnimateurTest) || message.member.hasPermission(['MANAGE_ROLES','MANAGE_CHANNELS'])) {
    
    if(!args[0]) return;

    if (args[0].toLowerCase() === "on") {
        message.guild.members.find(n=> n.id === id_BotBlindTest).addRole(id_BlindTest);

    ///Création salon vocal
        message.guild.createChannel(`🎵 Blind Test`, 'voice').then(
            (salonVocal) => {
                salonVocal.setParent(id_CategoryBlindTest).then( // Déplace le salon dans la bonne catégorie
                    (Vocal) => { // Permissions
                        Vocal.overwritePermissions(message.guild.roles.find(x => x.name === '@everyone'), { 'SPEAK': false }); // Permissions
                        Vocal.overwritePermissions(message.guild.roles.find(x => x.id === id_Visiteur), { 'CONNECT': false });
                        Vocal.overwritePermissions(message.guild.roles.find(x => x.id === id_Bot), { 'CONNECT': false });
                        Vocal.overwritePermissions(message.guild.roles.find(x=> x.id === id_BlindTest), { 'CONNECT': true });
                        Vocal.overwritePermissions(message.guild.roles.find(x=> x.id === id_Animateur), { 'SPEAK': true });
                        Vocal.overwritePermissions(message.guild.roles.find(x=> x.id === id_AnimateurTest), { 'SPEAK': true });
            })})
    /// Création salon texte
        message.guild.createChannel(`🎵-blind-test`, 'text').then(
        (createText) => {
            createText.setParent(id_CategoryBlindTest).then( // Déplace le salon dans la bonne catégorie
                (Text) => { // Permissions
                    Text.overwritePermissions(message.guild.roles.find(x=> x.name === "Muet"), { 'SEND_MESSAGES': false, 'SEND_TTS_MESSAGES': false, 'ADD_REACTIONS': false });
                    Text.overwritePermissions(message.guild.roles.find(x=> x.name === "Muet (texte)"), { 'SEND_MESSAGES': false, 'SEND_TTS_MESSAGES': false, 'ADD_REACTIONS': false });
                    Text.overwritePermissions(message.guild.roles.find(x=> x.id === id_Animateur), { 'READ_MESSAGES': true });
                    Text.overwritePermissions(message.guild.roles.find(x=> x.id === id_BlindTest), { 'READ_MESSAGES': false });
                    Text.overwritePermissions(message.guild.roles.find(x=> x.id === id_Animateur), { 'READ_MESSAGES': true });
                    Text.overwritePermissions(message.guild.roles.find(x=> x.id === id_AnimateurTest), { 'READ_MESSAGES': true });
                }
            )
        });
        message.guild.createChannel(`🎵-anim-blind-test`, 'text').then(
            (createText) => {
                createText.setParent(id_CategoryBlindTest).then( // Déplace le salon dans la bonne catégorie
                    (Text) => { // Permissions
                        Text.overwritePermissions(message.guild.roles.find(x=> x.name === "Muet"), { 'SEND_MESSAGES': false, 'SEND_TTS_MESSAGES': false, 'ADD_REACTIONS': false });
                        Text.overwritePermissions(message.guild.roles.find(x=> x.name === "Muet (texte)"), { 'SEND_MESSAGES': false, 'SEND_TTS_MESSAGES': false, 'ADD_REACTIONS': false });
                        Text.overwritePermissions(message.guild.roles.find(x => x.name ===  '@everyone'), { 'READ_MESSAGES': false })
                        Text.overwritePermissions(message.guild.roles.find(x=> x.id === id_BlindTest), { 'READ_MESSAGES': true });
                        Text.overwritePermissions(message.guild.roles.find(x=> x.id === id_Animateur), { 'READ_MESSAGES': true });
                        Text.overwritePermissions(message.guild.roles.find(x=> x.id === id_AnimateurTest), { 'READ_MESSAGES': true });
                    }
                )
            });

message.channel.send("Évent blind test prêt !");
            }
        if (args[0].toLowerCase() === "off") {
            try{
                message.guild.members.find(n=> n.id === id_BotBlindTest).removeRole(id_BlindTest);
                message.guild.channels.find(x => x.name ===  `🎵-blind-test`).delete();
                message.guild.channels.find(x => x.name ===  `🎵-anim-blind-test`).delete();
                message.guild.channels.find(x => x.name ===  `🎵 Blind Test`).delete();
            } catch (e) {};
        }

    } else return Embed0(`:no_entry: Erreur : permissions`, `Vous n'avez pas les permissions pour faire cela.`);
}