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
            Embed1("Tu as un rappel:", messageToSay)
        }, timeToRemind)
    }

    function waitingTimeToMs(timeOut) {

        var m = Math.floor(timeOut * 1000 * 60)
        return m
        // if (Number.isInteger(timeOut)){
        //     console.log("now were here")
        //     var m = Math.floor(timeOut * 1000 * 60)
        //     return m
        // }else{
        //     return Help
        // }
    }
}