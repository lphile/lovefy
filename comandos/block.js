const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { crearDB } = require("megadb"), block = new crearDB("blocks")
module.exports = async (client, message, args) => { const rol = message.mentions.roles.first()||message.guild.roles.cache.get(args[1])||message.guild.roles.cache.find(c=> c.name === args[1]),
can = message.mentions.channels.first()||message.guild.channels.cache.get(args[1])||message.guild.channels.cache.find(c=> c.name === args[1])

if (!block.has("canales" || "roles")) { if (rol) { block.set("roles", [rol.id]); message.channel.send(rol.toString() + " fue bloqueado para usar comandos") } 
                                                                         
 else if (can) { block.set("canales", [can.id]); message.channel.send(can.toString() + " fue bloqueado para usar comandos") } }
                                                  
else { if (rol) { block.push("roles", rol.id); message.channel.send(rol.toString() + " fue bloqueado para usar comandos") } 
       else if (can) { block.push("canales", can.id); message.channel.send(can.toString() + " fue bloqueado para usar comandos") } } }

module.exports.help = { nombre: "block", desc: "Configura los bloqueos de comandos", apagado: false, args: false, uso: "<comando> <roles | canales>", alias: ["cmdblock", "bloquear"], 
                       permiso: "MANAGE_GUILD", exm: ["`afijo d!`\nEstablece el afijo del servidor a **d!**", "`afijo @Daitsuki`\nEstablece el afijo del servidor a <@705156992544800768>"] }