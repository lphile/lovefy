const { MessageEmbed } = require("discord.js"), { dance } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle("¡Bailemos " + a.displayName + " !").setImage(dance[Math.floor(Math.random(dance) * dance.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " quiere bailar con " + b.displayName).setImage(dance[Math.floor(Math.random(dance) * dance.length)])) } }

module.exports.help = { nombre: "dance", desc: "¡Baila con alguien!", apagado: false, args: false, uso: "<nadie | miembro>", alias: ["baile", "danza"], 
                       exm: ["`dance`\n¡**Daitsu** te invitará a bailar!", "`dance @Rusho`\nDecides bailar con **Rusho**"], ctg: "Interacción"  }