const { version_survival } = require('../config.json');


exports.run = async (client, message) => {
    const utils = require('minecraft-server-util');

    utils.ping("127.0.0.1", { port: 25567}).then((response) => {
        console.log(response);
        const version = response.version;
        message.channel.send(`**Version :** ${version}`)
    })
    
}