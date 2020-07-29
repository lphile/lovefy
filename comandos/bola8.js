const { MessageEmbed } = require("discord.js"), { inspect } = require("util"), c = require("/app/config.json"), reg = new RegExp(/(¿*\?*)/)

module.exports = async (client, message, args) => { const ask = args.join(" "), ans = ["https://media.discordapp.net/attachments/696160908220694589/721533865813868564/si.gif", 
"https://media.discordapp.net/attachments/696160908220694589/721533865658679337/nop.gif", "https://media.discordapp.net/attachments/696160908220694589/721533857278591029/cqs.gif",
"https://media.discordapp.net/attachments/696160908220694589/721533865952280616/tal_vez.gif", "https://media.discordapp.net/attachments/696160908220694589/721549567836946462/ddqn.gif",
"https://media.discordapp.net/attachments/696160908220694589/721533856720879706/posible.gif", "https://media.discordapp.net/attachments/696160908220694589/721533827104636968/sindudas.gif"]

if(!args[0] || ask.length <= 6)  { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
.setDescription("Si tu **pregunta** es nula o 'capciosa', pues ... mi respuesta es un ejemplo de como se usa el comando 😌").addField("Ejemplo", module.exports.help.exm)) }
                                                   
else { message.channel.send(new MessageEmbed().setColor(c.color).setImage(ans[Math.floor(Math.random() * ans.length)]).setTitle("¿" + ask.replace(/(¿*\?*)/gm, "") + "?").setTimestamp()) } }

module.exports.help = { nombre: "bola8", desc: "Pregúntale a la bola ocho", apagado: false, args: false, uso: "<pregunta>", alias: ["pregunta", "8ball"], 
                       exm: ['`bola8 Soy hermoso`\nLe preguntas **"Soy hermoso"** a la bola8 y te responderá aleatoriamente *(quizás la verdad..)*'], ctg: "Entretenimiento" }