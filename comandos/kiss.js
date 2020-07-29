const { MessageEmbed } = require("discord.js"), { kiss } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle(a.displayName + "... o//o").setImage(kiss[Math.floor(Math.random(kiss) * kiss.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " ha besado a " + b.displayName + ", yo también quiero uno nwn").setImage(kiss[Math.floor(Math.random(kiss) * kiss.length)])) } }

module.exports.help = { nombre: "kiss", desc: "Besa a alguien 💋", apagado: false, args: false, uso: "<nada | miembro>", alias: ["besar", "darbeso"], 
                       exm: ["`kiss`\n**Daitsu** te dará un beso 😚", "`kiss @Smile`\nBesas a **Smile** por quererlo mucho"], ctg: "Interacción"  }