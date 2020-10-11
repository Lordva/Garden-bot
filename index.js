// Require Packages
const Discord = require('discord.js');
const { prefix, prefix2 } = require('./config.json');
const { token } = require('./token.json');
const client = new Discord.Client(); 

// Constant Variables
const ownerID = process.env.OWNER; 
const CommandCooldown = new Set();

// Listener Events

client.on('guildMemberAdd', member => { //Message de bienvenue
    try {
        //Auto-Reload
        delete require.cache[require.resolve(`./welcome.js`)]; 
    
        let commandFile = require(`./welcome.js`); 
        commandFile.run(client);
    } catch (e) { 
        //console.log(e.stack);
    }
})
client.on('message', message => {


    // Variables
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    let ops = {
        ownerID: 317026950939934721
    }

    // Return Statements
    if (message.author.bot) return; 

    if (message.content.startsWith(`${prefix2}${cmd}`)) {
        // Command Handler
        try {
            //Auto-Reload
            delete require.cache[require.resolve(`./commands/${cmd}2.js`)]; 
        
            let commandFile = require(`./commands/${cmd}2.js`); 
            commandFile.run(client, message, args, ops); 
    
        } catch (e) { 
            //console.log(e.stack);
        }
    } else if (message.content.startsWith(prefix)) { 
        try {
            //Auto-Reload
            delete require.cache[require.resolve(`./commands/${cmd}.js`)]; 
            let commandFile = require(`./commands/${cmd}.js`); 
            commandFile.run(client, message, args, ops); 
        } catch (e) { 
            //console.log(e.stack);
        }
    }
})

// Ready Event - Bot Online / Bot started
client.on('ready', () => console.log('Garden Bot ready!'));

// Discord Login 
client.login(token); 
