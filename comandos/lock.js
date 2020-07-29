const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), ms = require("ms"), { crearDB } = require("megadb"), db = new crearDB("locks")

module.exports = async (client, message, args) => { const can = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel, t = args[1]

if(!t) { const conf = db.has(message.guild.id)
             
if(conf) { await can.updateOverwrite(message.guild.id, { SEND_MESSAGES: null, ADD_REACTIONS: null  }); db.delete(can.id); message.channel.send(new MessageEmbed().setColor(c.color)
.setAuthor(message.guild.name, message.guild.iconURL()).setDescription(c.listo + " El bloqueo de " + can.toString() + " ha terminado")) }
            
else { await can.updateOverwrite(message.guild.id, { SEND_MESSAGES: false, ADD_REACTIONS: false  }); can.send(new MessageEmbed().setColor(c.color)
.setAuthor(message.guild.name, message.guild.iconURL()).setDescription(c.listo + " " + can.toString() + " ha sido bloqueado").setColor(c.color))

await can.updateOverwrite(message.guild.id, { SEND_MESSAGES: null, ADD_REACTIONS: null  }); can.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
.setDescription(c.listo + " El bloqueo de " + can.toString() + " ha terminado")); db.set(message.guild.id) } }

else { const conf = db.has(message.guild.id) 

if(conf) { await can.updateOverwrite(message.guild.id, { SEND_MESSAGES: null, ADD_REACTIONS: null  }); db.delete(can.id); message.channel.send(new MessageEmbed().setColor(c.color)
.setAuthor(message.guild.name, message.guild.iconURL()).setDescription(c.listo + " El bloqueo de " + can.toString() + " ha terminado")) }
            
else { const act = +new Date() + ms(t), d = new Date(act); await can.updateOverwrite(message.guild.id, { SEND_MESSAGES: false, ADD_REACTIONS: false  }); can.send(new MessageEmbed().setColor(c.color)
.setAuthor(message.guild.name, message.guild.iconURL()).setDescription(c.listo + " " + can.toString() + " ha sido bloqueado por `" + ms(ms(t)) + "`").setColor(c.color).setFooter("Hasta: ")
.setTimestamp(d)); setTimeout(async function() { await can.updateOverwrite(message.guild.id, { SEND_MESSAGES: null, ADD_REACTIONS: null  }); can.send(new MessageEmbed().setColor(c.color)
.setAuthor(message.guild.name, message.guild.iconURL()).setDescription(c.listo + " El bloqueo de " + can.toString() + " ha terminado")) }, ms(t)); db.set(can.id, message.guild.id) } } }

module.exports.help = { nombre: "lock", desc: "Silencia temporalmente al miembro mencionado", apagado: true, args: false, permiso: "MANAGE_ROLES", alias: ["bloquear", "lockdown"],
                              uso: "[canal] [tiempo]", exm: ["`lockdown #chat 10m`\nBloquea los envíos de mensajes para el canal **#chat** por **10 minutos**", 
                                                       "`lock`\nBloquea los envíos de mensajes para el canal en donde se envió el comando hasta que se desbloquee manualmente"] }