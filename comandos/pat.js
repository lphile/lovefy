const { MessageEmbed } = require("discord.js"), { pat } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle(a.displayName + " toma mi caricia nwn").setImage(pat[Math.floor(Math.random(pat) * pat.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " acarició a " + b.displayName + " oww").setImage(pat[Math.floor(Math.random(pat) * pat.length)])) } }

module.exports.help = { nombre: "pat", desc: "Acaricia a alguien nwn", apagado: false, args: false, uso: "<nada | miembro>", alias: ["acariciar", "tocar"], 
                       exm: ["`pat`\nSerás **acariciado** por Daitsu","`pat @Dai`\nAcaricias cariñosamente a **Dai**"], ctg: "Interacción"  }