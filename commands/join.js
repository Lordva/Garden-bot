

function daysAgo(date){
    const ms = Math.floor(new Date() - date);
    const days = Math.floor(ms / (24 * 60 * 60 * 1000))
    return days
}

function FormatDate(date){
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat("fr-FR", options).format(date).toLowerCase().split(",").join("");
}


exports.run = async (client, message, args) => {

    let member

    if (args.length == 0) {
        member = message.member;
    } else {
        console.log("Error argument was given")
        return
    }
    
    const joinedServer = FormatDate(member.joinedAt).toLowerCase()
    const timeAgo = daysAgo(new Date(member.joinedAt))

    message.channel.send(`Vous avez rejoin le serveur le **${joinedServer}** - il y a **${timeAgo}** jours`)

}