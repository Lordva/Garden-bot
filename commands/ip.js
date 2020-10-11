const { ip_survival, version_survival, ip_creative } = require('../config.json')

exports.run = async (client, message) => {
    message.channel.send(`**IP :** ${ip_survival} \n **Version :** ${version_survival}`)
}