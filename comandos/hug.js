const { MessageEmbed } = require("discord.js"), { hug } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle("Tranquil@, yo te abrazaré " + a.displayName + " 0//0").setImage(hug[Math.floor(Math.random(hug) * hug.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " le dió un abrazo a " + b.displayName).setImage(hug[Math.floor(Math.random(hug) * hug.length)])) } }

module.exports.help = { nombre: "hug", desc: "Envía un abrazo a alguien ❤", apagado: false, args: false, uso: "<nada | miembro>", alias: ["abrazar", "apachurrar"], 
                        exm: ["`hug`\nComo nadie te abraza la hará **Daitsu**", "`hug @Dai`\nAbrazas a **Dai** (*tiernooo*)"], ctg: "Interacción"  }