// This command requires the discord-js package to create embeds
const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    let user;
    user = message.author;

    // Role Verification
    //if (!message.member.roles.find(r => r.name === 'owner')) return message.channel.send('This requires the role: roleName');

    // Permission Verification
    //if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires the permission: ADMINISTRATOR');

    if (!args[0] || args[0] === "help") {
      try {

      delete require.cache[require.resolve(`./pollhelp.js`)]; 
      let commandFile = require(`./pollhelp.js`); 
      commandFile.run(client, message, args); 
  
  } catch (e) { 
      //console.log(e.stack);
  }
} else {
    
    const embed = new Discord.RichEmbed()
        .setColor('#007f47')
        .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
        //.setThumbnail('')
        .setDescription("*" + args.join(' ') + "*")
        .setFooter('Réagissez pour voter.')

    let msg = await message.channel.send(embed);

    await msg.react('👍'); 
    await msg.react('👎');
    await msg.react('🤷');

    message.delete({timeout: 1000}); // This waits 1000 milliseconds before deleting (1 second)
  }
} 