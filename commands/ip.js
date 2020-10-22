const { ip_survival, rconIp, rconPort } = require('../config.json')

exports.run = async (client, message) => {
    const utils = require('minecraft-server-util');
    const onlineplayers = "[INCONNU]"
    const serverVersion = "[INCONNU]"

    utils.status(rconIp, { port: rconPort }).then((responce) => {
        const onlineplayers = responce.onlinePlayers
        const serverVersion = responce.version
    }).catch( (e) => {
        console.error(`[ERROR] Could not connect to RCON on ${rconIp}:${rconPort} : ` + e)
    });
    message.channel.send(`**IP :** ${ip_survival} \n **Version :** ${serverVersion} \n Il y a ${onlineplayers} joueurs en ligne`)
        
    
    
}