const { MessageEmbed } = require("discord.js"), c = require("/app/config.json")

module.exports = async (client, message, args) => { const ltcapi = Math.round(client.ws.ping), ltcmsg = `${new Date().getTime() - message.createdTimestamp}`

if (ltcapi && ltcmsg < 500) { message.channel.send(new MessageEmbed().setTitle("Buena latencia")
   .setDescription("`API de Discord:` ```" + ltcapi + " milisegundos ```\n`Respuesta:` ```" + ltcmsg + " milisegundos ```").setColor("GREEN")) }

else if (ltcapi && ltcmsg > 1500) { message.channel.send(new MessageEmbed().setTitle("Latencia entrecursada")
   .setDescription("`API de Discord:` ```" + ltcapi + " milisegundos ```\n`Respuesta:` ```" + ltcmsg + " milisegundos ```").setColor("YELLOW")) }

else if (ltcapi && ltcmsg > 5000) { message.channel.send(new MessageEmbed().setTitle("Mala latencia")
   .setDescription("`API de Discord:` ```" + ltcapi + " milisegundos ```\n`Respuesta:` ```" + ltcmsg + " milisegundos ```").setColor("RED")) }

}
module.exports.help = { nombre: "latencia", desc: "Muestra la latencia del bot en milisegundos", apagado: false, args: false, uso: "[sin uso]", alias: ["ping", "latency"], ctg: "Información" }
