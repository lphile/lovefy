const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"); var mom = require("moment"); mom.locale('es')

module.exports = (client, message, args) => { const act = mom().startOf(client.uptime).fromNow(), dai = client.users.cache.get("271828777246392320"), 
      phil = client.users.cache.get("606522810948648970")
message.channel.send(new MessageEmbed().setColor(c.color).setTitle("Estamentos").addField("Servidores", client.guilds.cache.size, true).addField("Usuarios", client.users.cache.size, true)
.addField("Canales", client.channels.cache.size, true).addField("Memoria", (process.memoryUsage().heapUsed/1024/1024).toFixed(0)+"MB", true).addField("Actividad", act, true)
.addField("Enlaces", `[Autorización al servidor](${c.p_nec}), [servidor de soporte](https://is.gd/ap1ENE) y [donaciones](https://paypal.me/the0gr)`)) }

module.exports.help = { nombre: "bot", desc: "Muestra información sobre mí", apagado: false, args: false, uso: "[nada]", alias: ["stats", "botinfo"], ctg: "Información" }