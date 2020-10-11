// This command requires the discord-js package to create embeds
const Discord = require('discord.js');
const { prefix, id_DiscordGarden, id_Team, id_TeamCategory, id_ArchivesCategory } = require('../config.json');

exports.run = async (client, message, args) => {

//Check if it is the right server
if(message.guild.id !== id_DiscordGarden) return;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////    ESPACE FONCTIONS   ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateTeamRole(team) { /// Création Rôle
    message.guild.createRole({
        name: team,
        color: '#4E6F7B',
        mentionable: true
    })
}
function CreateTextChannel(team) { /// Création salon texte
    salonTexte = `🔏 Textuel ${team}`
    message.guild.createChannel(`🔏 Textuel ${team}`, 'text').then(
    (createText) => {
       createText.setParent(id_TeamCategory).then( // Déplace le salon dans la bonne catégorie
            (Text) => {
               Text.overwritePermissions(message.guild.roles.find(x => x.name ===  '@everyone'), { 'READ_MESSAGES': false }); // Permissions
                Text.overwritePermissions(message.guild.roles.find(x => x.name ===  team), {
                    //'MANAGE_ROLES': true,
                    'READ_MESSAGES': true,
                    'SEND_MESSAGES': true,
                    }
                )
            }
        )
    });
}
function CreateVoiceChannel(team) { ///Création salon vocal
message.guild.createChannel(`🔐 Vocal ${team}`, 'voice').then(
    (salonVocal) => {
        salonVocal.setParent(id_TeamCategory).then( // Déplace le salon dans la bonne catégorie
            (Vocal) => {
                Vocal.overwritePermissions(message.guild.roles.find(x => x.name === '@everyone'), { 'CONNECT': false }); // Permissions
                Vocal.overwritePermissions(message.guild.roles.find(x => x.name ===  team), {
                    'VIEW_CHANNEL': true,
                    //'MANAGE_ROLES': true,
                    'CONNECT': true,
                    'SPEAK': true,
                    //'MUTE_MEMBERS': true,
                    //'DEAFEN_MEMBERS': true,
                    //'MOVE_MEMBERS': true,
                });
        })})
}
Array.prototype.localeSort = function localeSort() { //Tri par ordre alphabétique
    return this.sort(function(a, b) {
    return a.localeCompare(b)
    })
}
function Embed1(Title, Description) {
    var Embed = new Discord.RichEmbed()
        .setColor('#007f47')
        .setTitle(Title)
        .setDescription(Description)
    message.channel.send(Embed) 
}
function ArgumentsInvalides() {
    Embed1(":x: Arguments invalides", "Commande annulée.");
}

if(message.guild.id === id_DiscordGarden) {
    var dot = '<:greendot:564534435039412234>';
} else {
    var dot = '• ';
}

function Help() {
    Embed1(':busts_in_silhouette: **Commandes !team**',
dot + "`" + prefix + "team create <nom> <∅|role|text|vocal>` **:** Créer une team, un rôle ou salon spécifique de team \n" + 
dot + "`" + prefix + "team delete <nom>` **:** Supprimer une team \n" + 
dot + "`" + prefix + "team rename <nom_team> <nouveau_nom>` **:** Renommer une team \n" +
dot + "`" + prefix + "team add <nom_team> <nom1> <nom2> <nom3>..` **:** Ajouter des membres à une team \n" + 
dot + "`" + prefix + "team remove <nom_team> <nom1> <nom2> <nom3>..` **:** Retirer des membres d'une team \n" +
dot + "`" + prefix + "team list` **:** Voir la liste des teams \n" +
dot + "`" + prefix + "team members <nom_team>` **:** Voir les membres d'une team");
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (!args[0]) return Help();

let command = args[0].toLowerCase();

///Help Team
if (command === "help") return Help();

///Team List
if (command === "list" && !args[1]) { 

    var AllRoles = message.guild.roles.map(r=>r.name); //Tous les rôles
    var AllTeams = Array();
        //Création de la liste
    for (var i = 0; i < AllRoles.length; i++) {
        if (AllRoles[i].startsWith('[') && AllRoles[i].endsWith(']') && AllRoles[i].length < 8) {  
            AllTeams.push(` ${AllRoles[i]}`) }
        }
        if (AllTeams.length > 0) {
            AllTeams.localeSort();
            Embed1(`:clipboard: Liste des teams (${AllTeams.length}) :`, (String(AllTeams)));
        } 
        else { 
            Embed1(`:clipboard: Liste des teams (0) :`, `Il n'y a actuellement aucune team.`);
        }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Info Team
if (command === "members") {
    if (!args[1]) return Embed1(`:x: Nom de team invalide`, "Veuillez préciser la team cible (sans crochets `[ ]`). \n Syntaxe : `" + prefix + "team members <nom_team>`"); // Nom de team non renseigné

    var AllRoles = message.guild.roles.map(r=>r.name); //Tous les rôles
    var AllTeams = Array();
    let TeamRaw = `[${args[1]}]`;
    if (AllRoles.includes(TeamRaw) && TeamRaw.length < 8) {
        //Création de la liste
        let TeamMembersRaw = message.guild.roles.find(m => m.name === TeamRaw).members.map(m=>m.user.id);
        let TeamMembers = Array();
            for (var i = 0; i < TeamMembersRaw.length; i++) {
                TeamMembers.push(` <@${TeamMembersRaw[i]}>`)
                }
            Embed1(`Team ${TeamRaw} : ${TeamMembersRaw.length} membres`, `${String(TeamMembers)}`);
            //console.log(TeamRaw)
            //console.log(TeamMembersRaw)
            //console.log(TeamMembers)
        } 
        else {
            Embed1(`:x: Nom de team invalide`, `Vérifiez la casse ou ce nom n'existe pas. \n Faites ` + "`" + prefix + "team list` pour voir la liste des teams existantes.");
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////


/// Création de team
    if (command === "create") {
        // Permission Verification
        if (!message.member.hasPermission(['MANAGE_ROLES','MANAGE_CHANNELS'])) return Embed1(`:no_entry: Erreur : permissions`, `Vous n'avez pas les permissions pour faire cela.`);

        NomTeam = `[${args[1]}]`;
        TeamCategory = id_TeamCategory;

        //Analayse nom
        if(message.guild.roles.some(role => role.name.toLowerCase() === NomTeam.toLowerCase()) && args[2].toLowerCase() !== "text" && args[2].toLowerCase() !== "role" && args[2].toLowerCase() !== "vocal") {
            Embed1(`:x: Nom invalide`, `Ce nom est déjà utilisé.`);
        } //Annule si doublon

        else if(!args[1] || args[1].length === 1) { 
            Embed1(`:x: Nom invalide`, `Le nom doit contenir entre 2 à 5 caractères.`);
        } //Nom trop court

        else if(args[1].length > 5) { 
            Embed1(`:x: Nom invalide`, `Le nom doit contenir entre 2 à 5 caractères.`);
        } //Nom trop long

    //Création team
        else if (args[2]) {
            if (args[2].toLowerCase() === "role") {
                if (message.guild.roles.some(role => role.name === NomTeam)) {
                    Embed1(`:x: Nom invalide`, `Ce nom est déjà utilisé.`);
                } else {
                    CreateTeamRole(NomTeam);
                    Embed1(`:white_check_mark: Création team`, `Rôle créé avec succès.`);
                }
            }
            else if (args[2].toLowerCase() === "vocal") {
                if (message.guild.roles.some(role => role.name === NomTeam)) {
                    if(message.guild.channels.some(x => x.name ===  `🔐 Vocal ${NomTeam}`)) {
                        Embed1(`:x: Création salon`, `Ce salon existe déjà.`);
                    } else {
                    CreateVoiceChannel(NomTeam);
                    Embed1(`:white_check_mark: Création salon`, `Salon vocal pour **${NomTeam}** créé avec succès.`);
                    }
                } else {
                    CreateTeamRole(NomTeam);
                    CreateVoiceChannel(NomTeam);
                    Embed1(`:white_check_mark: Création team`, `Rôle et salon vocal pour **${NomTeam}** créés avec succès.`);
                }
            }
            else if (args[2].toLowerCase() === "text") {
                if (message.guild.roles.some(role => role.name === NomTeam)) {
                    if (message.guild.channels.some(x => x.name ===  `🔏-textuel-${args[1].toLowerCase()}`)) {
                        Embed1(`:x: Création salon`, `Ce salon existe déjà.`);
                    } else {
                        CreateTextChannel(NomTeam);
                        Embed1(`:white_check_mark: Création salon`, `Salon textuel pour **${NomTeam}** créé avec succès.`);
                    }
                } else {
                    CreateTeamRole(NomTeam);
                    CreateTextChannel(NomTeam);
                    Embed1(`:white_check_mark: Création team`, `Rôle et salon textuel pour **${NomTeam}** créés avec succès.`);
                    }
            }        
        } else {
            CreateTeamRole(NomTeam);
            CreateTextChannel(NomTeam);
            CreateVoiceChannel(NomTeam);
            Embed1(`:white_check_mark: Création de team`, `Team **${NomTeam}** créée avec succès.`)
        }
    //console.log("Team créée avec succès");
    //console.log(args)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// Suppression de team
    if (command === "delete") {
        // Permission Verification
        if (!message.member.hasPermission('ADMINISTRATOR')) return Embed1(`:no_entry: Erreur : permissions`, `Vous devez être administrateur pour utiliser cette commande.`);
        if(!args[1]) return Embed1(`:x: Nom de team invalide`, "Veuillez préciser la team à supprimer (sans crochets `[ ]`).") // Pas de team

        NomTeam = `[${args[1]}]`;
        RoleTeam = message.guild.roles.find(x => x.name ===  NomTeam);
        salonTexte = message.guild.channels.find(x => x.name ===  `🔏-textuel-${args[1].toLowerCase()}`);
        salonVocal = message.guild.channels.find(x => x.name ===  `🔐 Vocal ${NomTeam}`);
        
        if(!RoleTeam) return Embed1(`:x: Nom de team invalide`, `Vérifiez la casse ou ce nom n'existe pas.`); // Cas 1/5 : Nom de team non trouvé

        if (!salonTexte && !salonVocal && RoleTeam !== null) { //Cas 2/5 : Salons texte et vocal non trouvés
            Embed1(`:warning: Salons de team non trouvés`, `Les salons textuel et vocal de la team **${NomTeam}** n'ont pas été trouvés. Voulez-vous tout de même continuer ?` + " (`oui`/`non`)");

            const confirmation1 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 30000 }); //Confirmation 1 : ignorer les salons non trouvés
            //console.log(confirmation1)
            confirmation1.on('collect', message => {
            if (message.content.toLowerCase() === "non" || message.content.toLowerCase() === "no") {
                Embed1(`:octagonal_sign: Salons de team non trouvés`, `Commande annulée.`);
            } 
            else if (message.content.toLowerCase() === "oui" || message.content.toLowerCase() === "yes") {
                Embed1(`:warning: Demande de confirmation`, `Êtes-vous sûr(e) de vouloir supprimer la team **${NomTeam}** ? Cette action est irréversible.` + " (`oui`/`non`)");

                const confirmation2 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 30000 }); //Confirmation 2 : supprimer
                //console.log(confirmation2)
                confirmation2.on('collect', message => {
                    if (message.content.toLowerCase() === "non" || message.content.toLowerCase() === "no") {
                        Embed1(`:octagonal_sign: Salons de team non trouvés`, `Commande annulée.`);
                    }
                    else if (message.content.toLowerCase() === "oui" || message.content.toLowerCase() === "yes") { //Suppression rôle
                        TeamMembers = RoleTeam.members.map(m=>m.user.id); 
                        //console.log(TeamMembers);
                        for (var i = 0; i < TeamMembers.length; i++) {
                            message.guild.member(TeamMembers[i]).removeRole(id_Team)
                        }
                        RoleTeam.delete();
                        Embed1(":wastebasket: Suppression de team", `Team **${NomTeam}** supprimée avec succès.`);
                    }
                    else return ArgumentsInvalides();
                })
            }
            else return ArgumentsInvalides();
            })
        };

        if (!salonTexte && salonVocal !== null && RoleTeam !== null) { //Cas 3/5 : Salon texte non trouvé
            Embed1(`:warning: Salon textuel non trouvé`, `Le salon textuel de la team **${NomTeam}** n'a pas été trouvé. Voulez-vous tout de même continuer ?` + " (`oui`/`non`).");

            const confirmation1 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 30000 }); //Confirmation 1 : ignorer le salon texte non trouvé
            //console.log(confirmation1)
            confirmation1.on('collect', message => {
            if (message.content.toLowerCase() === "non" || message.content.toLowerCase() === "no") {
                Embed1(`:octagonal_sign: Salon textuel non trouvé`, `Commande annulée.`);
            }
            else if (message.content.toLowerCase() === "oui" || message.content.toLowerCase() === "yes") {
                Embed1(`:warning: Demande de confirmation`, `Êtes-vous sûr(e) de vouloir supprimer la team **${NomTeam}** ? Cette action est irréversible.` + " (`oui`/`non`)");

                const confirmation2 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 30000 }); //Confirmation 2 : supprimer
                //console.log(confirmation2)
                confirmation2.on('collect', message => {
                    if (message.content.toLowerCase() === "non" || message.content.toLowerCase() === "no") {
                        Embed1(`:octagonal_sign: Salon textuel non trouvé`, `Commande annulée.`);
                    }
                    else if (message.content.toLowerCase() === "oui" || message.content.toLowerCase() === "yes") { 
                        TeamMembers = RoleTeam.members.map(m=>m.user.id); //Suppression salon vocal + rôle
                        //console.log(TeamMembers);
                        for (var i = 0; i < TeamMembers.length; i++) {
                            message.guild.member(TeamMembers[i]).removeRole(id_Team)
                        }
                        salonVocal.delete();
                        RoleTeam.delete();
                        Embed1(`:wastebasket: Suppression de team`, `Team **${NomTeam}** supprimée avec succès.`);
                    }
                    else return ArgumentsInvalides();
                })
            }
            else return ArgumentsInvalides();
            })
        };

        if (salonTexte !== null && !salonVocal && RoleTeam !== null) { //Cas 4/5 : Salon vocal non trouvé
            Embed1(`:warning: Salon vocal non trouvé`, `Le salon vocal de la team **${NomTeam}** n'a pas été trouvé. Voulez-vous tout de même continuer ?` + " (`oui`/`non`)");

            const confirmation1 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 30000 }); //Confirmation 1 : ignorer le salon vocal non trouvé
            //console.log(confirmation1)
            confirmation1.on('collect', message => {
                if (message.content.toLowerCase() === "non" || message.content.toLowerCase() === "no") {
                    Embed1(`:octagonal_sign: Salon vocal non trouvé`, `Commande annulée.`);
                }
                else if (message.content.toLowerCase() === "oui" || message.content.toLowerCase() === "yes") {
                    Embed1(`:warning: Demande de confirmation`, `Êtes-vous sûr(e) de vouloir supprimer la team **${NomTeam}** ? Cette action est irréversible.` + " (`oui`/`non`)");

                const confirmation2 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 30000 }); //Confirmation 2 : supprimer
                //console.log(confirmation2)
                confirmation2.on('collect', message => {
                    if (message.content.toLowerCase() === "non" || message.content.toLowerCase() === "no") { 
                        Embed1(`:octagonal_sign: Salon vocal non trouvé`, `Commande annulée.`);
                    }
                    else if (message.content.toLowerCase() === "oui" || message.content.toLowerCase() === "yes") { 
                        TeamMembers = RoleTeam.members.map(m=>m.user.id); //Suppression salon texte + rôle
                        //console.log(TeamMembers);
                        for (var i = 0; i < TeamMembers.length; i++) {
                            message.guild.member(TeamMembers[i]).removeRole(id_Team)
                        }
                        salonTexte.delete();
                        RoleTeam.delete();
                        Embed1(`:wastebasket: Suppression de team`, `Team **${NomTeam}** supprimée avec succès.`);
                    }
                    else return ArgumentsInvalides();
                })}
                else return ArgumentsInvalides();
            })
        };

    if (salonTexte !== null && salonVocal !== null && RoleTeam !== null) { // Cas 5/5 : salons et rôle trouvés (cas normal)
        Embed1(`:warning: Demande de confirmation`, `Êtes-vous sûr(e) de vouloir supprimer la team **${NomTeam}** ? Cette action est irréversible.` + " (`oui`/`non`)");

        const confirmation = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 30000 }); // Confirmation suppression
        //console.log(confirmation)
        confirmation.on('collect', message => {
            if (message.content.toLowerCase() === "non") { 
                Embed1(`:octagonal_sign: Confirmation`, `Commande annulée.`);
            }
            else if (message.content.toLowerCase() === "oui") { 
                TeamMembers = RoleTeam.members.map(m=>m.user.id); // Suppression salons + rôles
                //console.log(TeamMembers);
                for (var i = 0; i < TeamMembers.length; i++) {
                    message.guild.member(TeamMembers[i]).removeRole(id_Team)
                }
                salonTexte.delete();
                salonVocal.delete();
                RoleTeam.delete();
                Embed1(`:wastebasket: Suppression de team`, `Team **${NomTeam}** supprimée avec succès.`);
            }
            else return ArgumentsInvalides();
        })
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// Ajout de membre
    if (command === "add") {
    // Permission Verification
    if (!message.member.hasPermission('MANAGE_ROLES')) return Embed1(`:no_entry: Erreur : permissions`, `Vous n'avez pas les permissions pour faire cela.`);
    
        var NomTeam = `[${args[1]}]`;
        var RoleTeam = message.guild.roles.find(x => x.name ===  NomTeam);
        Membres = message.mentions.members.map(m=>m.user.id);
        console.log(Membres);

        if(!args[1]) return Embed1(`:x: Nom de team invalide`, "Veuillez préciser la team cible (sans crochets `[ ]`)."); // Nom de team non renseigné
        if(!RoleTeam) return Embed1(`:x: Nom de team invalide`, `Vérifiez la casse ou ce nom n'existe pas. \n Syntaxe : ` + "`" + prefix + "team add <nom_team> <nom1> <nom2> <nom3>..`"); // Nom de team non trouvé
        if(!args[2]) return Embed1(`:x: Aucun membre sélectionné`, `Veuillez préciser le joueur à ajouter. \n Syntaxe : ` + "`" + prefix + "team add <nom_team> <nom1> <nom2> <nom3>..`)"); // Nom du joueur non renseigné
        if (Membres.length === 0) return Embed1(`:x: Erreur`, `Aucun membre à ajouter trouvé. \n Syntaxe : ` + "`" + prefix + "team add <nom_team> <nom1> <nom2> <nom3>..`)"); //Pas de mention

        // Ajout des rôles pour chaque mention
        else {
            var AlreadyInTeam = Array();
            var InOtherTeam = Array();
            var AddedInTeam = Array();
            
            for (var i = 0; i < Membres.length; i++) {
                // Erreur 1/2 : Membre déjà dans la team
                if (message.guild.member(Membres[i]).roles.has(RoleTeam.id) && message.guild.member(Membres[i]).roles.has(id_Team)) {
                //console.log(`${Membres[i]} est déjà dans cette team`)
                    AlreadyInTeam.push(` <@${Membres[i]}>`)
                }
                // Erreur 2/2 : Membre fait partie d'une autre team
                else if (message.guild.member(Membres[i]).roles.has(id_Team)) {
                    InOtherTeam.push(` <@${Membres[i]}>`)
                }
                 // Cas normal
                else {
                    message.guild.member(Membres[i]).addRole(id_Team)
                    message.guild.member(Membres[i]).addRole(RoleTeam)
                    AddedInTeam.push(` <@${Membres[i]}>`)
                    //console.log(`${Membres[i]} ajouté à ${NomTeam}.`)
                }
            }
            if (AddedInTeam.length > 0 && InOtherTeam.length > 0) {Title = `:notepad_spiral: ${NomTeam} Ajout membre`};
            if (AddedInTeam.length > 0 && AlreadyInTeam.length > 0) {Title = `:notepad_spiral: ${NomTeam} Ajout membre`};
            if (AddedInTeam.length === 0 && InOtherTeam.length > 0) {Title = `:x: ${NomTeam} : Erreur`};
            if (AddedInTeam.length === 0 && AlreadyInTeam.length > 0) {Title = `:x: ${NomTeam} : Erreur`};
            if (AddedInTeam.length === 1 && AlreadyInTeam.length === 0 && InOtherTeam.length === 0) {Title = `:heavy_plus_sign: ${NomTeam} : Nouveau membre`};
            if (AddedInTeam.length > 1 && AlreadyInTeam.length === 0 && InOtherTeam.length === 0) {Title = `:heavy_plus_sign: ${NomTeam} : Nouveaux membres`};
            Description = Array();
            if (AddedInTeam.length === 1) {Description.push(`${dot} ${AddedInTeam} a rejoint la team. \n`)};
            if (AddedInTeam.length > 1) {Description.push(`${dot} ${AddedInTeam} ont rejoint la team. \n`)};
            if (AlreadyInTeam.length === 1) {Description.push(`${dot} ${AlreadyInTeam} est déjà dans la team ! \n`)};
            if (AlreadyInTeam.length > 1) {Description.push(`${dot} ${AlreadyInTeam} sont déjà dans la team ! \n`)};
            if (InOtherTeam.length === 1) {Description.push(`${dot} ${InOtherTeam} est déjà dans une team ! \n`)};
            if (InOtherTeam.length > 1) {Description.push(`${dot} ${InOtherTeam} sont déjà dans une team ! \n`)};
            
            var Add = new Discord.RichEmbed()
                .setColor('#007f47')
                .setTitle(Title)
                .setDescription(Description)
            message.channel.send(Add);
                //console.log(Membres)
                //console.log(AlreadyInTeam)
                //console.log(InOtherTeam)
                //console.log(AddedInTeam)
                //console.log(Membres);
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Retrait membre
    if (command === "remove") { 
    // Permission Verification
    if (!message.member.hasPermission('MANAGE_ROLES')) return Embed1(`:no_entry: Erreur : permissions`, "Vous n'avez pas les permissions pour faire cela.");

        NomTeam = `[${args[1]}]`;
        RoleTeam = message.guild.roles.find(x => x.name ===  NomTeam);
        Membres = message.mentions.members.map(m=>m.user.id);

        if(!args[1]) return Embed1(`:x: Nom de team invalide`, "Veuillez préciser la team à supprimer (sans crochets `[ ]`)."); // Nom de team non renseigné
        if(!RoleTeam) return Embed1(`:x: Nom de team invalide`, `Vérifiez la casse ou ce nom n'existe pas. \n Syntaxe : ` + "`" + prefix + "team remove <nom_team> <nom1> <nom2> <nom3>..`)"); // Nom de team non trouvé
        if(!args[2]) return Embed1(`:x: Aucun membre sélectionné`, `Veuillez préciser le joueur à retirer. \n Syntaxe : ` + "`" + prefix + "team remove <nom_team> <nom1> <nom2> <nom3>..`)"); // Nom du joueur non renseigné
        if (Membres.length === 0) return Embed1(`:x: Erreur`, `Aucun membre à retirer trouvé. \n Syntaxe : ` + "`" + prefix + "team remove <nom_team> <nom1> <nom2> <nom3>..`)"); //Pas de mention
        
        // Retrait des rôles pour chaque mention
            for (var i = 0; i < Membres.length; i++) {
                if (!message.guild.member(Membres[i]).roles.has(RoleTeam.id) && message.guild.member(Membres[i]).roles.has(id_Team)) { // Erreur 1/2 : Membre pas dans la team
                //console.log(`${Membres[i]} n'est pas dans cette team`)
                Embed1(`:x: ${NomTeam} : Erreur`, `<@${Membres[i]}> n'est dans pas cette team !`);
                }
                else if (!message.guild.member(Membres[i]).roles.has(id_Team) && !message.guild.member(Membres[i]).roles.has(RoleTeam.id)) { // Erreur 2/2 : Membre n'est dans aucune team
                    Embed1(`:x: ${NomTeam} : Erreur`, `<@${Membres[i]}> n'est dans aucune team !`);
                } 
                else { // Cas normal
                    message.guild.member(Membres[i]).removeRole(id_Team)
                    message.guild.member(Membres[i]).removeRole(RoleTeam)
                    Embed1(`:heavy_minus_sign: ${NomTeam} : Retrait membre`, `<@${Membres[i]}> n'est plus dans la team.`);
                    //console.log(`${Membres[i]} retiré de ${NomTeam}.`)
                }
            }
        }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Renommer team
if (command === "rename") { 
    if (!message.member.hasPermission(['MANAGE_ROLES','MANAGE_CHANNELS'])) return Embed1(`:no_entry: Erreur : permissions`, `Vous n'avez pas les permissions pour faire cela.`);
    if(!args[1]) return Embed1(`:x: Nom de team invalide`, "Veuillez préciser la team cible (sans crochets `[ ]`)."); // Nom de team non renseigné
    if (!args[2]) return Embed1(`:x: Erreur`, "Veuillez préciser le nouveau nom de team."); //Nouveau nom de team non renseigné
    if(args[2].length === 1) return Embed1(`:x: Nom invalide`, `Le nom doit contenir entre 2 à 5 caractères.`); //Nom trop court
    if(args[2].length > 5) return Embed1(`:x: Nom invalide`, `Le nom doit contenir entre 2 à 5 caractères.`); //Nom trop long
    if (args[1] === args[2]) return Embed1(`:x: Nom invalide`, `Les noms sont indentiques. Veuillez choisir des noms différents.`) //Noms identiques
    NomTeam = `[${args[1]}]`;
    NouveauNomTeam = `[${args[2]}]`

    if(message.guild.roles.some(role => role.name === NouveauNomTeam)) return Embed1(`:x: Nom de team invalide`, "Ce nom est déjà pris."); // Nouveau nom de team déjà pris

    RoleTeam = message.guild.roles.find(x => x.name ===  NomTeam);
    salonTexte = message.guild.channels.find(x => x.name ===  `🔏-textuel-${args[1].toLowerCase()}`);
    salonVocal = message.guild.channels.find(x => x.name ===  `🔐 Vocal ${NomTeam}`);

    if(RoleTeam) {
        RoleTeam.setName(NouveauNomTeam);
    } else return Embed1(`:x: Nom de team invalide`, `Vérifiez la casse ou ce nom n'existe pas. \n Syntaxe : ` + "`" + prefix + "team rename <nom_team> <nouveau_nom>`"); // Nom de team non trouvé

    try {
        salonTexte.setName(`🔏-textuel-${args[2].toLowerCase()}`);
        salonVocal.setName(`🔐 Vocal ${NouveauNomTeam}`);
    }
    catch (err) {};
    
    Embed1(`:clipboard: Nouveau nom de team`,`La team **${NomTeam}** devient **${NouveauNomTeam}** !`);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Archive team
if (command === "archive") { 
    if (!message.member.hasPermission(['MANAGE_ROLES','MANAGE_CHANNELS'])) return Embed1(`:no_entry: Erreur : permissions`, `Vous n'avez pas les permissions pour faire cela.`);
    if(!args[1]) return Embed1(`:x: Nom de team invalide`, "Veuillez préciser la team cible (sans crochets `[ ]`)."); // Nom de team non renseigné

    NomTeam = `[${args[1]}]`;
    RoleTeam = message.guild.roles.find(x => x.name ===  NomTeam);
    salonTexte = message.guild.channels.find(x => x.name ===  `🔏-textuel-${args[1].toLowerCase()}`);
    salonVocal = message.guild.channels.find(x => x.name ===  `🔐 Vocal ${NomTeam}`);

    if(!RoleTeam) return Embed1(`:x: Nom de team invalide`, `Vérifiez la casse ou ce nom n'existe pas ou la team est déjà archivée.`); // Nom de team non trouvé

    var dt = new Date();

    let TeamMembersRaw = RoleTeam.members.map(m=>m.user.id);
    if (TeamMembersRaw.length > 0) {
        var TeamMembers = Array();
        for (var i = 0; i < TeamMembersRaw.length; i++) {
            message.guild.member(TeamMembersRaw[i]).removeRole(id_Team);
            TeamMembers.push(` <@${TeamMembersRaw[i]}>`);
            }
    } else {
        var TeamMembers = "Aucun"
    }
    //Salon vocal
    if(message.guild.channels.some(x => x.name === `🔐 Vocal ${NomTeam}`)) { //Check vocal
        var HasVocal = "oui"
        salonVocal.delete();
    }
    else {
        var HasVocal = "non"
    }
    //Salon textuel
    if(message.guild.channels.some(x => x.name === `🔏-textuel-${args[1].toLowerCase()}`)) { //Check text
        var HasText = "oui"

        salonTexte.setParent(id_ArchivesCategory).then( // Déplace le salon dans la bonne catégorie
            (Text) => {
                Text.overwritePermissions(message.guild.roles.find(x => x.name ===  '@everyone'), { 'READ_MESSAGES': false }); // Permissions
                Text.overwritePermissions(message.guild.roles.find(x => x.name ===  NomTeam)).delete();
                Text.send(`**--- :package: Team ${NomTeam} archivée le ${
                    dt.getDate().toString().padStart(2, '0')}/${
                    (dt.getMonth()+1).toString().padStart(2, '0')}/${
                    dt.getFullYear().toString().padStart(4, '0')} ---**`
                    );
            }
        );
        salonTexte.setName(`🔏-textuel-${args[1].toLowerCase()}-archive`);
    } else {
    var HasText = "non"
}
    RoleTeam.delete();

    Embed1(`**--- :package: Team ${NomTeam} archivée le ${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ---**`,
    `**Liste des membres (${TeamMembersRaw.length}):** ${String(TeamMembers)} \n 
     **Salon vocal :** ${HasVocal} \n
     **Salon textuel :** ${HasText}`);
}

///Désarchive team
if (command === "unarchive") { 
    if (!message.member.hasPermission(['MANAGE_ROLES','MANAGE_CHANNELS'])) return Embed1(`:no_entry: Erreur : permissions`, `Vous n'avez pas les permissions pour faire cela.`);

    NomTeam = `[${args[1]}]`;
    RoleTeam = message.guild.roles.find(x => x.name ===  NomTeam);
    salonTexte = message.guild.channels.find(x => x.name === `🔏-textuel-${args[1].toLowerCase()}-archive`);

    CreateTeamRole(NomTeam);
    
    var dt = new Date();
    
    salonTexte.setParent(id_TeamCategory).then( // Déplace le salon dans la bonne catégorie
        (Text) => {
            Text.overwritePermissions(message.guild.roles.find(x => x.name ===  '@everyone'), { 'READ_MESSAGES': false }); // Permissions
            Text.overwritePermissions(message.guild.roles.find(x => x.name ===  NomTeam), {
                'MANAGE_ROLES': true,
                'READ_MESSAGES': true,
                'SEND_MESSAGES': true,
                }
            )
            Text.setName(`🔏-textuel-${args[1].toLowerCase()}`)
            Text.send(`**--- :package: Team ${NomTeam} désarchivée le ${
                dt.getDate().toString().padStart(2, '0')}/${
                (dt.getMonth()+1).toString().padStart(2, '0')}/${
                dt.getFullYear().toString().padStart(4, '0')} ---**`
                );
        }
    );

    message.channel.send(`**--- :package: Team ${NomTeam} désarchivée le ${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ---**`);

    try {
        salonVocal.delete();
    }
    catch (e) {};
}


//console.log(args)
}
