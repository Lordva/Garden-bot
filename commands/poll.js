// This command requires the discord-js package to create embeds
const Discord = require('discord.js');
const { prefix } = require('../config.json');

exports.run = async (client, message, args, tools) => {

    const options = [
        '🇦',
        '🇧',
        '🇨',
        '🇩',
        '🇪',
        '🇫',
        '🇬',
        '🇭',
        '🇮',
        '🇯',
        '🇰',
        '🇱',
        '🇲',
        '🇳',
        '🇴',
        '🇵',
        '🇶',
        '🇷',
        '🇸',
        '🇹',
        '🇺',
        '🇻',
        '🇼',
        '🇽',
        '🇾',
        '🇿',
      ];
      
    let user;
    user = message.author;
    
    // Role Verification
    //if (!message.member.roles.find(r => r.name === 'owner')) return message.channel.send('This requires the role: roleName');

    // Permission Verification
    //if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous devez être administrateur pour utiliser cette commande.');
  
    if (!args[0] || args[0] === "help") {
      try {
        
      delete require.cache[require.resolve(`./pollhelp.js`)]; 
      let commandFile = require(`./pollhelp.js`); 
      commandFile.run(client, message); 
  
  } catch (e) { 
      //console.log(e.stack);
  }
} else { 

    const pollLog = {};

    function canSendPoll(user_id) {
        if (pollLog[user_id]) {
          const timeSince = Date.now() - pollLog[user_id].lastPoll;
          if (timeSince < 30000) {
            return false;
          }
        }
        return true;
      }

    let argus = message.content.match(/"(.+?)"/g);
    if (argus) {
      if (!canSendPoll(message.author.id)) {
        return message
          .channel
          .send(`${message.author} please wait before sending another poll.`);
      } else if (argus.length === 1) { // yes no unsure question
        const question = argus[0].replace(/"/g, '');
        pollLog[message.author.id] = {
          lastPoll: Date.now()
        };

        const yesno_embed = new Discord.RichEmbed()
        .setColor('#007f47')
        .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
        //.setThumbnail('')
        .setDescription(`${question}`)
        .setFooter('Réagissez pour voter.')

        return message
          .channel.send(yesno_embed).then(async (pollMessage) => {
            await pollMessage.react('👍');
            await pollMessage.react('👎');
            await pollMessage.react('🤷');

        message.delete({timeout: 1000}); // This waits 1000 milliseconds before deleting (1 second)   
          });
      } else { // multiple choice
        argus = argus.map(a => a.replace(/"/g, ''));
        const question = argus[0];
        const questionOptions = [...new Set(argus.slice(1))];
        if (questionOptions.length > 20) {
          return message.channel.send(`**Erreur:** ${message.author}, les sondages sont limités à 20 options.`);
        } else {
          pollLog[message.author.id] = {
            lastPoll: Date.now()
          };

          const multiple_embed = new Discord.RichEmbed()
        .setColor('#007f47')
        .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
        //.setThumbnail('')
        .setTitle(`${question}`)
        .setDescription(`${questionOptions.map((option, i) => `${options[i]}  ${option}`).join('\n')}`)
        .setFooter('Réagissez pour voter.')

          return message.channel.send(multiple_embed)
            .then(async (pollMessage) => {
              for (let i = 0; i < questionOptions.length; i++) {
                await pollMessage.react(options[i]);
              }
          message.delete({timeout: 2000}); // This waits 2000 milliseconds before deleting (2 seconds)
            });
        }
    }
}
    else {
      return message.channel.send(`**Erreur:** ${message.author}, la question et les options doivent être entre guillemets (**"**). Pour plus d'infos, faites ` + '`' + prefix + "pollhelp`.");
    }
} }