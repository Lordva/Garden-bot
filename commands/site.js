const Discord = require('discord.js'); // We need this to form & send embeds.
const { site } = require('../config.json');

// Command Handler
exports.run = async (client, message, args) => {

    message.channel.send(`**Site : <${site}>**`)

}