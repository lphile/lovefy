const { MessageEmbed } = require("discord.js"), { boot } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle("Patada de cangurooo " + a.displayName + " 😠").setImage(boot[Math.floor(Math.random(boot) * boot.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " ha pateado a " + b.displayName + " 😂").setImage(boot[Math.floor(Math.random(boot) * boot.length)])) } }

module.exports.help = { nombre: "boot", desc: "Patea a alguien 😎", apagado: false, args: false, uso: "<nada | miembro>", alias: ["patada", "patear"], 
                       exm: ["`boot`\n**Daitsu** accionará al no especificar un miembro", "`boot @Dai`\nPateas directamente a **Dai** 🙀"], ctg: "Interacción"  }