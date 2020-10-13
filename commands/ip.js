const { ip_survival, version_survival, ip_creative } = require('../config.json')

exports.run = async (client, message) => {
    const utils = require('minecraft-server-util');

    utils.ping("127.0.0.1", { port: 25567 }).then((responce) => {
        const onlineplayers = responce.onlinePlayers
        const serverVersion = responce.version
        message.channel.send(`**IP :** ${ip_survival} \n 
        **Version :** ${serverVersion} \n 
        Il y a ${onlineplayers} joueurs en ligne`)
    });
}