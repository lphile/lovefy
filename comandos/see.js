const { MessageEmbed } = require("discord.js"), { see } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle(a.displayName + " 👀").setImage(see[Math.floor(Math.random(see) * see.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " está espiando a " + b.displayName + " 👀").setImage(see[Math.floor(Math.random(see) * see.length)])) } }

module.exports.help = { nombre: "see", desc: "Mira a alguien 👀", apagado: false, args: false, uso: "<nada | miembro>", alias: ["espiar", "mirar" ], 
                        exm: ["`see`\nVeo veo...","`see @Smile`\nA que espías a **Smile**"], ctg: "Interacción"  }