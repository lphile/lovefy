const { MessageEmbed } = require("discord.js"), { sleep } = require("/app/interacciones.json")

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!b) { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                              .setTitle(a.displayName + " se va a dormir").setImage(sleep[Math.floor(Math.random(sleep) * sleep.length)])) }
                       
else { message.channel.send(new MessageEmbed().setFooter(a.user.tag, message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                            .setTitle(a.displayName + " está durmiendo con " + b.displayName + " -uwu-").setImage(sleep[Math.floor(Math.random(sleep) * sleep.length)])) } }

module.exports.help = { nombre: "sleep", desc: "Duerme", apagado: false, args: false, uso: "<nada | miembro>", alias: ["dormir", "sueño", "mimir"], 
                       exm: ["`sleep`\nTe pondrás a dormir sólo", "`sleep @Dai`\n**Duermes** junto a **Dai** uwu"], ctg: "Interacción"  }