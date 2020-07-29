const { MessageEmbed } = require("discord.js"), { confused } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle(a.displayName + " está confundid@...").setImage(confused[Math.floor(Math.random(confused) * confused.length)])) }
                       
else { message.channel.send(new MessageEmbed().setColor("RANDOM").setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp()
                            .setTitle(a.displayName + " hizo confundir a " + b.displayName + "❓").setImage(confused[Math.floor(Math.random(confused) * confused.length)])) } }

module.exports.help = { nombre: "confused", desc: "¿Confúndete?", apagado: false, args: false, uso: "<nada | miembro>", alias: ["perdido", "confundido"], 
                       exm: ["`confused`\nTe.. **¿confundes?**"], ctg: "Interacción"  }