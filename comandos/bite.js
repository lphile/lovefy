const { MessageEmbed } = require("discord.js"), { bite } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle("Ñam ñam... " + a.displayName).setImage(bite[Math.floor(Math.random(bite) * bite.length)])) }
                       
else { message.channel.send(new MessageEmbed().setColor("RANDOM").setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp()
                            .setTitle(a.displayName + " mordió a " + b.displayName + " 😯").setImage(bite[Math.floor(Math.random(bite) * bite.length)])) } }

module.exports.help = { nombre: "bite", desc: "Muerde sin piedad 😬", apagado: false, args: false, uso: "<nada | miembro>", alias: ["morder", "masticar"], 
                       exm: ["`bite`\n**Daitsu** accionará al no especificar un miembro", "`bite @Phile`\nMuerdes a **Phile**, *jiji*"], ctg: "Interacción" }