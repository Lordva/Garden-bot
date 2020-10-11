const { seed_survival } = require('../config.json');

exports.run = async (client, message) => {
    message.channel.send(`**Seed serveur survie :**` + "`" + `${seed_survival}` + "`")
}