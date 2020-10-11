const Discord = require('discord.js'); // We need this to form & send embeds.
const { id_DiscordGarden, prefix, id_Visiteur, id_Membre, id_Staff, rconPass} = require('../config.json');

const utils = require('minecraft-server-util');
const rcon = new utils.RCON('127.0.0.1', { port: 25576, password: rconPass });

rcon.on('output', (message) => console.log(message));
// Command Handler
exports.run = async (client, message) => {

//Check if it is the right server
    if(message.guild.id !== id_DiscordGarden) return;

    function Embed1(Title, Description) {
        var Embed = new Discord.RichEmbed()
            .setColor('#007f47')
            .setTitle(Title)
            .setDescription(Description)
        message.channel.send(Embed) 
    }

    if (!message.member.hasPermission('MANAGE_ROLES')) return Embed1(`:no_entry: Erreur : permissions`, `Vous n'avez pas les permissions pour faire cela.`);

    Visiteur = message.mentions.members.map(m=>m.user.id);
    VisiteurName = message.mentions.members.map(m=>m.user.username);

    console.log(`here is the person your talking about : ${VisiteurName}`);

    if (Visiteur.length === 0) return Embed1(`:x: Erreur`, `Aucun membre à ajouter trouvé. \n Syntaxe : ` + "`" + prefix + "m <nom1> <nom2> <nom3>..`)"); //Pas de mention

    // Ajout des rôles pour chaque mention
    else {
        var DejaMembre = Array();
        var NouveauMembre = Array();
        var PasVisiteur = Array();
        for (var i = 0; i < Visiteur.length; i++) {
            // Erreur 1/2: Joueur déjà membre ou staff
            if (message.guild.member(Visiteur[i]).roles.has(id_Staff) || message.guild.member(Visiteur[i]).roles.has(id_Membre)) {
            //console.log(`${Visiteur[i]} est déjà membre`)
                DejaMembre.push(` <@${Visiteur[i]}>`)
            }
            // Erreur 2/2: Joueur pas visiteur
            else if (!message.guild.member(Visiteur[i]).roles.has(id_Visiteur)) {
                //console.log(`${Visiteur[i]} est déjà membre`)
                    PasVisiteur.push(` <@${Visiteur[i]}>`)
                }
             // Cas normal
            else {
                message.guild.member(Visiteur[i]).addRole(id_Membre)
                try {message.guild.member(Visiteur[i]).removeRole(id_Visiteur)}
                catch (e) {}
                NouveauMembre.push(` <@${Visiteur[i]}>`)
                //console.log(`${Visiteur[i]} ajouté à ${NomTeam}.`)

               const rconMember = async () => {
                   console.log("your here");
                   await rcon.connect() // Doesn't wanna connect 
                   console.log(`we are talking of ${VisiteurName[i]}`)
                   await rcon.run(`lp user ${VisiteurName[i]} parent set membre`);
                   return rcon.close();
               };
               rconMember();
            }
        }

        if (NouveauMembre.length === 0) {Title = `:x: **Erreur**`};
        if (NouveauMembre.length === 1) {Title = `<:garden:542826251296047107> Nouveau membre !`};
        if (NouveauMembre.length > 1) {Title = `<:garden:542826251296047107> Nouveaux membres ! `};
        Description = Array();
        if (NouveauMembre.length === 1) {Description.push(`**Bienvenue à ${NouveauMembre} !** \n`)};
        if (NouveauMembre.length > 1) {
            var ant = Number(NouveauMembre.length - 2);
            var last = `${NouveauMembre[ant]} et${NouveauMembre[NouveauMembre.length - 1]}`;
            NouveauMembre.splice(ant, 1, last);
            NouveauMembre.pop();
            Description.push(`**Bienvenue à ${NouveauMembre} !** \n`)};
        if (DejaMembre.length === 1) {Description.push(`${DejaMembre} est déjà membre ! \n`)};
        if (DejaMembre.length > 1) {
            var ant = Number(DejaMembre.length - 2);
            var last = `${DejaMembre[ant]} et${DejaMembre[DejaMembre.length - 1]}`;
            DejaMembre.splice(ant, 1, last);
            DejaMembre.pop();
            Description.push(`${DejaMembre} sont déjà membres ! \n`)};
        if (PasVisiteur.length === 1) {Description.push(`${PasVisiteur} n'est pas visiteur. \n`)};
        if (PasVisiteur.length > 1) {
            var ant = Number(PasVisiteur.length - 2);
            //console.log(PasVisiteur.length);
            //console.log(ant);
            var last = `${PasVisiteur[ant]} et${PasVisiteur[PasVisiteur.length - 1]}`;
            //console.log(last);
            PasVisiteur.splice(ant, 1, last);
            PasVisiteur.pop();
            Description.push(`${PasVisiteur} ne sont pas visiteurs. \n`)
        };
        
        var Add = new Discord.RichEmbed()
            .setColor('#007f47')
            .setTitle(Title)
            .setDescription(Description)
        message.channel.send(Add);
            //console.log(Visiteur);
            //console.log(DejaMembre);
            //console.log(PasVisiteur);
            //console.log(NouveauMembre);
            //console.log(Visiteur);
    }
}