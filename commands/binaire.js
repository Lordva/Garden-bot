const { MessageEmbed, RichEmbed } = require("discord.js");
const fetch = require('node-fetch');


exports.run = async (client, message, args) => {

    if (!args[0]){
        return message.channel.send(':x: Voulez vous encoder ou decoder ?');
    } else if (args[0] === 'encode') {
        const text = args.slice(1).join(' ');
        if(!text){
            return message.channel.send(':x: Merci de rentrer un text valide');
        }else if(text.lenght >= 1024) {
            return message.channel.send(':x: votre message doit faire moins de 1044 characteres');
        };


        const url = `http://some-random-api.ml/binary?text=${text}`;
        let response;
        try{
            response = await fetch(url).then(res => res.json());   
        }
        catch (e){
            return message.channel.send(":x: Une erreur c'est produite !" + e)
        }

        const embed = new RichEmbed()
            .setColor('GREEN')
            .setTitle('Encodeur Binaire')
            .addField('Input', `\`\`\`\n${text}\`\`\``)
            .addField('Output', `\`\`\`\n${response.binary}\`\`\``)
            .setFooter(`Demandé par ${message.author.tag}`)
            .setTimestamp();
        
        message.channel.send(embed);
    } else if (args[0] === 'decode'){
        const text = args.slice(1).join(' ');
        if(!text){
            return message.channel.send(':x: Merci de rentrer un text valide');
        }else if(text.lenght >= 1024) {
            return message.channel.send(':x: votre message doit faire moins de 1044 characteres');
        };

        const url = `http://some-random-api.ml/binary?decode=${text}`;
        let response;
        try{
            response = await fetch(url).then(res => res.json());
        }
        catch (e){
            return message.channel.send(":x: Une erreur c'est produite !" + e)
        }

        const embed = new RichEmbed()
                .setColor('GREEN')
                .setTitle('Décodeur Binaire')
                .addField('Input', `\`\`\`\n${text}\`\`\``)
                .addField('Output', `\`\`\`\n${response.text}\`\`\``)
                .setFooter(`Demandé par ${message.author.tag}`)
                .setTimestamp();
                
        message.channel.send(embed);
    }
}