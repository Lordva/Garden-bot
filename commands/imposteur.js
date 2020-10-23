
exports.run = async (client, message, args) => {
    const isimposter = Math.floor(Math.random() * 2) + 1;
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);

    if (!member) {
        return message.channel.send(
            ':x: Entrer un utilisateur valide',
        );
    }

    if (isimposter === 1){
        message.channel.send([`
			. 　　　。　　　　•　 　ﾟ　　。 　　.
			　　　.　　　 　　.　　　　　。　　 。　. 　
			.　　 。　　　　　                    。 . 　　 • 　　　　•
			ﾟ　　 ${member.user.username} was not An Impostor.　 。　.
				'　　　 2 Impostor remains 　 　　。
			ﾟ　　　.　　　. ,　　　　.　 .
			`]);
    } else if (isimposter === 2){
        message.channel.send([`
        . 　　　。　　　　•　 　ﾟ　　。 　　.
			　　　.　　　 　　.　　　　　。　　 。　. 　
			.　　 。　　　　　                        。 . 　　 • 　　　　•
			ﾟ　　 ${member.user.username} was An Impostor.　 。　.
				'　　　 1 Impostor remains 　 　　。
			ﾟ　　　.　　　. ,　　　　.　 .
			`]);
    }
}