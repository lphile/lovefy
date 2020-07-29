const { MessageEmbed } = require("discord.js"), { punch } = require("/app/interacciones.json")
module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle(a.displayName + " bam bam, baaaang").setImage(punch[Math.floor(Math.random(punch) * punch.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " golpeó a " + b.displayName + " woaaa").setImage(punch[Math.floor(Math.random(punch) * punch.length)])) } }

module.exports.help = { nombre: "punch", desc: "¡Golpea a alguien!😡", apagado: false, args: false, uso: "<nada | miembro>", alias: ["golpear", "pegar"],
                        exm: ["`punch`\nProvocas a **Daitsu** y te golpea, oof", "`punch @Clyde`\nGolpeas a **Clyde**, *okkk*"], ctg: "Interacción"  }