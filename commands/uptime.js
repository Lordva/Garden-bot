const Discord = require('discord.js');
const client = new Discord.Client()
const { MessageEmbed } = require("discord.js");

exports.run = async(message) => {

    let totalSeconds = client.uptime / 1000;
    let hours = (totalSeconds / (60 * 60)).toString().split('.')[0];
    let minutes = (totalSeconds / 60 % 60).toString().split('.')[0];
    let seconds = (totalSeconds % 60).toString().split('.')[0];

    message.channel.send(`Le bot est up depuis ${hours} heures, ${minutes} minutes et ${seconds} secondes`);
}