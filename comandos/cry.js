const { MessageEmbed } = require("discord.js"), cry = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle(a.displayName + " llora sin alguien que lo console...").setImage(cry[Math.floor(Math.random(cry) * cry.length)])) }
                      
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " llora por " + b.displayName + ", algo habrá pasado...").setImage(cry[Math.floor(Math.random(cry) * cry.length)])) } }

module.exports.help = { nombre: "cry", desc: "Llora...😭", apagado: false, args: false, uso: "<nada | miembro>", alias: ["llorar","llanto."], 
                       exm: ["`cry`\nLloras desconsoladamente 😭", "`cry @Smile`\nLloras por la pérdida de **Smile** 😢"], ctg: "Interacción"  }