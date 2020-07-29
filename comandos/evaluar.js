const { MessageEmbed } = require("discord.js"), { inspect } = require("util"), c = require("/app/config.json"), { crearDB } = require("megadb"), cfg = new crearDB("configs"), mom = require("moment"), 
      ms = require("ms")

module.exports = async (client, message, args) => { if(["271828777246392320", "606522810948648970"].includes(message.author.id)) { let ae = args.join(" "), eldo = inspect(eval(ae, { depth: 0 } )),
    embed = new MessageEmbed().setColor(c.color).setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    
try { if(ae) { message.channel.send(embed.addField("Demora", "```"+`${new Date().getTime() - message.createdTimestamp} milisegundos`+"```").addField("Entrada", "```js\n" + ae + "\n```")
      .addField("Salida", "```js\n" + eldo.slice(0, 1950) + "\n```")) } else { message.channel.send(embed.setDescription("No evaluaré la nulidad, ejecuta un código para ser evaluado")) } }

catch(err) { message.channel.send(embed.addField("Demora", "```"+`${new Date().getTime() - message.createdTimestamp} milisegundos`+"```").addField("Entrada", "```js\n" + ae + "\n```")
      .addField("Salida", "```js\n" + err + "\n```")) } }
    
else { message.channel.send(new MessageEmbed().setColor(c.color).setDescription("Necesitas el cargo **Desarrollador** para usar este comando")).then(m => m.delete(5000)) } }

module.exports.help = { nombre: "evaluar", desc: "Evalúa códigos", apagado: false, args: false, uso: "<código>", alias: ["eval", "codeval"] }