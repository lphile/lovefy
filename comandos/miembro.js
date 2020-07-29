const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), mom = require("moment"); mom.locale("es")

module.exports = (client, message, args) => { const a = message.mentions.members.first() || message.guild.members.cache.find(m => m.nickname === args[0]) || 
      message.guild.members.cache.find(m => m.id === args[0]), au = client.users.cache.get(args[0]) || message.mentions.users.first(), b = message.member, bu = message.author;
    
    var insg = { "DISCORD_EMPLOYEE": "Discord Employee", "DISCORD_PARTNER": "Discord Partner", "BUGHUNTER_LEVEL_1": "<:cazaerrores:727297430961258821>", "SYSTEM": "System",
    "HYPESQUAD_EVENTS": "<:hypesquad:696469632701300796>", "HOUSE_BRAVERY": "<:bravery:727297429686190160>", "HOUSE_BRILLIANCE": "<:brilliance:727297429740847157>",
    "HOUSE_BALANCE": "<:balance:727297430005088286>", "EARLY_SUPPORTER": "Early Supporter", "VERIFIED_DEVELOPER": "<:desarrollador:727297429103181865>", "TEAM_USER": "Team User",
    "VERIFIED_BOT": "Verified Bot", "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)" }
    
 if (a) { if(au.flags.toArray().length > 0) { message.channel.send(new MessageEmbed().setTitle(insg[au.flags.toArray()]).setColor(c.color)) }
          message.channel.send(new MessageEmbed().setTitle("Información").addField("Creación de cuenta", mom(au.createdAt).format('LL') + " a las " + mom(au.createdAt).format('LTS'))
                              .addField("Entró al servidor", mom(a.joinedAt).format('LL') + " a las " + mom(a.joinedAt).format('LTS'))
                              .addField("Permisos", a.permissions.toArray().map(p => c.permisos[p]).join(", ")).setColor(c.color)) }
                                             
 else { if(b.user.flags.toArray().length > 0) { message.channel.send(new MessageEmbed().setTitle(c.badges[bu.flags.toArray()]).setColor(c.color)) }
        message.channel.send(new MessageEmbed().setTitle("Información").addField("Creación de cuenta", mom(bu.createdAt).format('LL') + " a las " + mom(bu.createdAt).format('LTS'))
                              .addField("Entró al servidor", mom(b.joinedAt).format('LL') + " a las " + mom(b.joinedAt).format('LTS'))
                              .addField("Permisos", b.permissions.toArray().map(p => c.permisos[p]).join(", ")).setColor(c.color)) } }

module.exports.help = { nombre: "miembro", desc: "Muestra información del miembro mencionado o tuyo si no has mencionado", apagado: false, args: false, uso: "[id | mención | nombre y etiqueta]", 
                       alias: ["member", "user", "userinfo"], exm: ["`miembro @Luigi`\nMuestra **información** detallada sobre el miembro Luigi"] }
