const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { mast } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(message.channel.nsfw) { if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                                    .setTitle(a.displayName + " se está tocando 😭").setImage(mast[Math.floor(Math.random(mast) * mast.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + ", se masturbó con " + b.displayName).setImage(mast[Math.floor(Math.random(mast) * mast.length)])) } }
                                             
else { message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL()).setDescription("La etiqueta de este canal debe de ser **NSFW**").setColor(c.color)) } }

module.exports.help = { nombre: "mast", desc: "Hazte una paja herman@", apagado: false, args: false, uso: "<nada | miembro>", alias: ["paja", "jalarse", "dedearse"], 
                       exm: ["`masturbate`\nTe autoestimulas 🙈","`masturbate @Rucho`\ne la tocas a **Rucho** *(no ves nada)*"], ctg: "+18"  }