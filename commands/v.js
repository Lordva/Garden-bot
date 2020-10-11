const Discord = require('discord.js'); // We need this to form & send embeds.
const { id_Visiteur, id_DiscordGarden } = require('../config.json')

// Command Handler
exports.run = async (client, message, args) => {

//Check if it is the right server
if(message.guild.id !== id_DiscordGarden) return;

    if (!message.member.hasPermission(['MANAGE_CHANNELS'])) return;

    if (!args[0]) {
    message.guild.channels.get(message.channel.id).overwritePermissions(message.guild.roles.find(x => x.name === '@everyone'), { 'READ_MESSAGES': false });
    message.guild.channels.get(message.channel.id).overwritePermissions(message.guild.roles.find(x => x.id === id_Visiteur), { 'READ_MESSAGES': false });
    }

    if (args[0] === 'off') {
        message.guild.channels.get(message.channel.id).overwritePermissions(message.guild.roles.find(x => x.name === '@everyone'), { 'READ_MESSAGES': null });
        if(
        message.channel.parent.id === '449311271075053579' || message.channel.parent.id === '521316441883148288' || message.channel.parent.id === '578859920460349440' || message.channel.parent.id === '566649503352881182' || message.channel.parent.id === '554727196367781911') { } //Ignore staff categories
        
        if(message.channel.id === '472528442575945728') {
            message.guild.channels.get(message.channel.id).overwritePermissions(message.guild.roles.find(x => x.id === id_Visiteur), { 'READ_MESSAGES': null });
        }

        if(message.channel.id === '548877056658767893' || message.channel.id === '688525085849812993' || message.channel.id === '688525085849812993' || message.channel.id === '688525085849812993') {
            message.guild.channels.get(message.channel.id).overwritePermissions(message.guild.roles.find(x => x.id === id_Visiteur), { 'READ_MESSAGES': false });
        } //Ignore non guest channels

        else {
            message.guild.channels.get(message.channel.id).overwritePermissions(message.guild.roles.find(x => x.id === id_Visiteur), { 'READ_MESSAGES': true });
        }
    }
    console.log(args)
}