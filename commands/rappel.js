const Discord = require('discord.js');
const {prefix, id_DiscordGarden} = require('../config.json')

exports.run = async (client, message, args) => {
    if (!args[0] || args[0] === "help") {
         try {delete message;} catch (e) { console.log("ERROR could not delete message! " + e) }
         return Help() 
    }


    
    

    function Embed1(Title, Description) {
        var Embed = new Discord.RichEmbed()
            .setColor('#007f47')
            .setTitle(Title)
            .setDescription(Description)
        message.channel.send(Embed) 
    }

    function Help(){
        var dot = '• ';
        Embed1(':busts_in_silhouette: **Commande !rappel**',
dot + "`" + prefix + "rappel <temps en minutes> <message>` **:** Créer un rappel d'une durée specifique \n");
    }
    
    console.log(args)
    message.react('☑');
    var timeOut = args[0];
    console.log('time : ' + timeOut + "min");
    args.shift();
    messageToSay = args.toString();
    messageToSay = messageToSay.replace(/,/gi, ' ');
    CreateReminder(message, timeOut, messageToSay)

    
    function CreateReminder(msg, timeInMinute, messageToSay){
        var timeToRemind = waitingTimeToMs(timeInMinute)
        setTimeout(function () {
            msg.channel.send('Hey, ' + msg.author)
            Embed1("rappel: votre message", messageToSay)
        }, timeToRemind)
    }

    // function remind(msg, messageToSay) {
    //     msg.channel.send('Hey, ' + msg.author)
    //     msg.channel.send({
    //         Embed: {
    //             author: {
    //                 name: msg.author.username,
    //                 icon_url: msg.author.avatarURL
    //             },
    //             color: 9384170,
    //             title: 'Rappel: votre message',
    //             Description: '**' + messageToSay + '**',
    //             timestamp: new Date()
    //         }
    //     )}
    // }

    function waitingTimeToMs(timeOut) {
        console.log(timeOut)
        if (Number.isInteger(timeOut)){
            console.log("now were here")
            var m = Math.floor(timeOut * 60000)
            return m
        }else{
            return Help
        }
    }
}