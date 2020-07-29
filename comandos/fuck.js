const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { fuck } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(message.channel.nsfw) { if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                                    .setTitle(a.displayName + ", lávate el culo que hoy te toca").setImage(fuck[Math.floor(Math.random(fuck) * fuck.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " se está follando a " + b.displayName).setImage(fuck[Math.floor(Math.random(fuck) * fuck.length)])) } }
                                             
else { message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL()).setDescription("La etiqueta de este canal debe de ser **NSFW**").setColor(c.color)) } }

module.exports.help = { nombre: "fuck", desc: "Folla con alguien 😎", apagado: false, args: false, uso: "<nada | miembro>", alias: ["coger", "violar", "follar"], 
                        exm: ["`fuck`\n**Daitsu** te dirá que hoy te toca 🥵", "`fuck @Phile`\nTe **follas** a Phile 😯"], ctg: "+18" }