const { version_survival } = require('../config.json');

exports.run = async (client, message) => {
    message.channel.send(`**Version :** ${version_survival}`)
}