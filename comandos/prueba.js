const { MessageEmbed } = require("discord.js"), c = require("/app/config.json");

module.exports = (client, message, args) => { const a = message.member, b = message.mentions.members.first() || message.guild.members.cache.get(args[0]), acción = c.acción

    if(!b) { message.channel.send(new MessageEmbed().setFooter("ㅤ", message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                                  .setTitle("Tal tal tal owo uwu " + a.displayName).setImage(acción[Math.floor(Math.random(acción) * acción.length)])) }

    else { message.channel.send(new MessageEmbed().setFooter("ㅤ", message.author.displayAvatarURL()).setTimestamp().setColor("RANDOM")
                                .setTitle(a.displayName + ", tal tal tal a " + b.displayName).setImage(acción[Math.floor(Math.random(acción) * acción.length)])) } }

module.exports.help = { nombre: "prueba", descripcion: "La descripción", apagado: false, args: false, uso: "<nada | miembro>", alias: ["sus-apodos"] }