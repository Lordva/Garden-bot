const { GuildMember, Message, RichEmbed, displayAvatarURL } = require('discord.js');


function daysAgo(date){
    const ms = Math.floor(new Date() - date);
    const days = Math.floor(ms / (24 * 60 * 60 * 1000))
    return days
}

function FormatDate(date){
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat("fr-FR", options).format(date).toLowerCase().split(",").join("");
}

function getMember(message, memberName) {
    if (!message.guild) return null
    let target = message.guild.members.find(member => {
        if (member.user.tag.slice(0, -5).toLowerCase() == memberName.toLowerCase()) {
            return member;
        }
    });

    if (!target) {
        target = message.guild.members.find(member => {
            return member.displayName.toLowerCase().includes(memberName.toLowerCase()) || member.user.tag.toLowerCase().includes(memberName.toLowerCase());
        });
    }

    if (!target) {
        target = message.guild.members.find(member => {
            return member.user.id == memberName;
        });
    }

    return target;
}

function Embed1(Title, Description, icon) {
    var Embed = new RichEmbed()
        .setColor('#007f47')
        .setTitle(Title)
        .setDescription(Description)
        .setThumbnail(icon)
    return Embed
}

exports.run = async (client, message, args) => {

    let member

    if (args.length == 0) {
        member = message.member;
    } else {
        if(!message.mentions.members.first()){
            try{
                member = getMember(message, args[0]);
            } catch(e){
                console.log(`Une erreur c'est produite : ${e}`)
            }
        } else {
            member = message.mentions.members.first();
        }
    }

    if (!member){
        return message.channel.send("Utilisateur invalide");
    }
    
    const joinedServer = FormatDate(member.joinedAt).toLowerCase()
    const timeAgo = daysAgo(new Date(member.joinedAt))

    // message.channel.send(`${member.displayName} a rejoint le serveur le **${joinedServer}** - il y a **${timeAgo}** jours`)
    message.channel.send(Embed1(member.user.tag, `a rejoint le serveur le **${joinedServer}** - il y a **${timeAgo}** jours`, member.user.avatarURL))
}