// This command requires the discord-js package to create embeds
const Discord = require('discord.js');
const { id_NotifSondages, id_DiscordGarden } = require('../config.json');

exports.run = async (client, message, args) => {

    let user;
    user = message.author;

  //Check if it is the right server (optional)
  if(message.guild.id !== id_DiscordGarden) return;

    // Role Verification
    //if (!message.member.roles.find(r => r.name === 'owner')) return message.channel.send('This requires the role: roleName');

    // Permission Verification
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous devez être administrateur pour utiliser cette commande.');

    if (!args[0]) {
      try {

      // Bonus: Auto-Reload (You should move this into it's own command)
      delete require.cache[require.resolve(`./pollhelp.js`)]; 

      let commandFile = require(`./pollhelp.js`); 
      commandFile.run(client, message); 
  
  } catch (e) { 
      //console.log(e.stack);
  }
} else {
    
  const NotifSondages = message.guild.roles.find(role => role.id === id_NotifSondages);

  const embed = new Discord.RichEmbed()
        .setColor('#007f47')
        .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
        //.setThumbnail('')
        .setDescription("*" + args.join(' ') + "*")
        .setFooter('Réagissez pour voter.')

    NotifSondages.setMentionable(true, 'Role needs to be pinged')
    //.then(updated => console.log(`Role mentionable: ${updated.mentionable}`))
    //.catch(console.error);

    let msg = await message.channel.send(embed).then(message.channel.send(`<@&${id_NotifSondages}>`));
    
    await(NotifSondages.setMentionable(false, 'Role does not need to be pinged anymore'))
    //.then(updated => console.log(`Role mentionable: ${updated.mentionable}`))
    //.catch(console.error);
    await msg.react('👍'); 
    await msg.react('👎');
    await msg.react('🤷');
    
    message.delete({timeout: 1000}); // This waits 1000 milliseconds before deleting (1 second)
  }
} 