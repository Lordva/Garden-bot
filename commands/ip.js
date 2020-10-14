const { ip_survival, rconIp, rconPort } = require('../config.json')

exports.run = async (client, message) => {
    const utils = require('minecraft-server-util');

    utils.ping(rconIp, { port: rconPort }).then((responce) => {
        const onlineplayers = responce.onlinePlayers
        const serverVersion = responce.version
        message.channel.send(`**IP :** ${ip_survival} \n **Version :** ${serverVersion} \n Il y a ${onlineplayers} joueurs en ligne`)
    });
}