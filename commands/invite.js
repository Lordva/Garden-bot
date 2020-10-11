// This command requires the discord-js package to create embeds
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    
    var invites = await message.Guild.GetInvitesAsync();

    await ReplyAsync(invites.Select(x => x.Url).FirstOrDefault())

}