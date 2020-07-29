const { MessageEmbed } = require("discord.js"), { run } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle("¡Ha huído " + a.displayName + "!").setImage(run[Math.floor(Math.random(run) * run.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " huye de " + b.displayName).setImage(run[Math.floor(Math.random(run) * run.length)])) } }

module.exports.help = { nombre: "run", desc: "¡Escapa de alguien!", apagado: false, args: false, uso: "<nada | miembro>", alias: ["huir", "escapar"], 
                        exm: ["`run`\nPrepárate para huir...","`run @Phile`\nHuyes de **Phile**, qué habrá pasado..."], ctg: "Interacción"  }