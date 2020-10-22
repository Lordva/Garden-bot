const { rconIp, rconPort } = require('../config.json');


exports.run = async (client, message) => {
    const utils = require('minecraft-server-util');

    utils.status(rconIp, { port: rconPort}).then((response) => {
        console.log(response);
        const version = response.version;
        message.channel.send(`**Version :** ${version}`);
    })
    
}