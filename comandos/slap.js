const { MessageEmbed } = require("discord.js"), { slap } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle("Toma esoo " + a.displayName).setImage(slap[Math.floor(Math.random(slap) * slap.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " abofeteó a " + b.displayName).setImage(slap[Math.floor(Math.random(slap) * slap.length)])) } }

module.exports.help = { nombre: "slap", desc: "Dale una paliza a alguien 👿", apagado: false, args: false, uso: "<nada | miembro>", alias: ["paliza", "lapo"], 
                        exm: ["`slap`\n**Daitsu** te abofeteará","`slap @Rucho`\nAbofeteas a **Rucho**, damn"], ctg: "Interacción"  }