const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { suck } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(message.channel.nsfw) { if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                                    .setTitle(">///< " + a.displayName).setImage(suck[Math.floor(Math.random(suck) * suck.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " lame el miembro de " + b.displayName).setImage(suck[Math.floor(Math.random(suck) * suck.length)])) } }
                                             
else { message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL()).setDescription("La etiqueta de este canal debe de ser **NSFW**").setColor(c.color))  } }

module.exports.help = { nombre: "masturbate", desc: "Se lo lames todito", apagado: false, args: false, uso: "<nada | miembro>", alias: ["mamar", "chupar"], 
                       exm: ["`suck`\nExitas a **Daitsu** y te la comienza a mamar", "`suck @Smile`\nLames la cosita pequeña de **Smile** o//o"], ctg: "+18"  }