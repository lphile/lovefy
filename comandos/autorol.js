const { MessageEmbed } = require("discord.js"), { color, listo } = require("/app/config.json"), { crearDB } = require("megadb"), cfg = new crearDB("configs")

module.exports = async (client, message, args) => { const a = message.mentions.roles.first() || message.guild.roles.cache.find(l => l.name === args[2]) || message.guild.roles.cache.find(l=> 
l.id === args[2]), embed = new MessageEmbed().setColor(color).setAuthor(message.guild.name, message.guild.iconURL()), com = a.comparePositionTo(message.guild.me.roles.highest)
/* if(["lista", "roll"].includes(args[0])) { const embed = new MessageEmbed().setTitle("Lista de autoroles").setColor(c.color).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL())
if(db.has("mem." + message.guild.id)) { await db.map("mem." + message.guild.id, (v, k) => "<@&" + v + ">").then(mem => { embed.addField("Humanos", mem.join(", ")) }) }
if(db.has("bot." + message.guild.id)) { await db.map("bot." + message.guild.id, (v, k) => "<@&" + v + ">").then(bot => { embed.addField("Robots", bot.join(", ")) }) }; message.channel.send(embed) } */

if(["add", "agregar"].includes(args[0])) { 
  
  if(["human", "humano"].includes(args[1])) { if(!a) { message.channel.send(embed.setDescription("Argumento `rol` no válido, debe de establecer un rol de **su servidor**")) }
                                             
  else if (com > 0) { message.channel.send(embed.setDescription(`No puedo gestionar el rol ${a} es más alto jerárquicamente que mi rol integrado, asegúrese de que tenga los permisos indicados`)) }
                                       
  else { if(!cfg.has("autorol.mem." + message.guild.id)) { cfg.set("autorol.mem." + message.guild.id, [a.id]) 
         message.channel.send(embed.setDescription(`${listo} ${a} ha sido añadido correctamente como rol de entrada para los miembros **humanos**`)) }
         else { cfg.push("autorol.mem." + message.guild.id, a.id)
         message.channel.send(embed.setDescription(`${listo} ${a} ha sido añadido correctamente como rol de entrada para los miembros **humanos**`)) } } }
                                            
  if(["bot", "robot"].includes(args[1])) { if(!a) { message.channel.send(embed.setDescription("Argumento `rol` no válido, debe de establecer un rol de **su servidor**")) }
 
  else if (com > 0) { message.channel.send(embed.setDescription(`No puedo gestionar el rol ${a} es más alto jerárquicamente que mi rol integrado, asegúrese de que tenga los permisos indicados`)) }
                                       
  else { if(!cfg.has("autorol.bot." + message.guild.id)) { cfg.set("autorol.bot." + message.guild.id, [a.id]) 
         message.channel.send(embed.setDescription(`${listo} ${a} ha sido añadido correctamente como rol de entrada para los miembros **robots**`)) }
         else { cfg.push("autorol.bot." + message.guild.id, a.id)
         message.channel.send(embed.setDescription(`${listo} ${a} ha sido añadido correctamente como rol de entrada para los miembros **robots**`)) } } }

  if(["ambos", "both"].includes(args[1])) { if(!a) { message.channel.send(embed.setDescription("Argumento `rol` no válido, debe de establecer un rol de **su servidor**")) }
 
  else if (com > 0) { message.channel.send(embed.setDescription(`No puedo gestionar el rol ${a} es más alto jerárquicamente que mi rol integrado, asegúrese de que tenga los permisos indicados`)) }
                                       
  else { if(!cfg.has("autorol.bth." + message.guild.id)) { cfg.set("autorol.bth." + message.guild.id, [a.id]) 
         message.channel.send(embed.setDescription(`${listo} ${a} ha sido añadido correctamente como rol de entrada para los miembros **totales**`)) }
         else { cfg.push("autorol.bth." + message.guild.id, a.id)
         message.channel.send(embed.setDescription(`${listo} ${a} ha sido añadido correctamente como rol de entrada para los miembros **totales**`)) } } } } 
                                                   
if(["rmv", "remover"].includes(args[0])) { 
  
  if(["human", "humano"].includes(args[1])) { if(cfg.has("autorol.mem." + message.guild.id)) { cfg.find("autorol.mem." + message.guild.id, (v) => v === a.id).then(rol => { if(rol == undefined)
  { message.channel.send(embed.setDescription("No se ha encontrado este rol en su lista de roles de entrada para miembros humanos")) } else { cfg.extract("autorol.mem." + message.guild.id, a.id)
  message.channel.send(embed.setDescription(`${listo} ${a} ha sido removido correctamente de la lista de roles de entrada para miembros **humanos**`)) } }) } }
                                            
  if(["robot", "bot"].includes(args[1])) { if(cfg.has("autorol.bot." + message.guild.id)) { cfg.find("autorol.bot." + message.guild.id, (v) => v === a.id).then(rol => { if(rol == undefined)
  { message.channel.send(embed.setDescription("No se ha encontrado este rol en su lista de roles de entrada para miembros robots")) } else { cfg.extract("autorol.bot." + message.guild.id, a.id)
  message.channel.send(embed.setDescription(`${listo} ${a} ha sido removido correctamente de la lista de roles de entrada para miembros **robots**`)) } }) } }
                                                   
  if(["ambos", "both"].includes(args[1])) { if(cfg.has("autorol.bth." + message.guild.id)) { cfg.find("autorol.bth." + message.guild.id, (v) => v === a.id).then(rol => { if(rol == undefined)
  { message.channel.send(embed.setDescription("No se ha encontrado este rol en su lista de roles de entrada para miembros totales")) } else { cfg.extract("autorol.bth." + message.guild.id, a.id)
  message.channel.send(embed.setDescription(`${listo} ${a} ha sido removido correctamente de la lista de roles de entrada para miembros **totales**`)) } }) } } }
                                                  
                                                  
}; module.exports.help = { nombre: "autorol", desc: "Establece un rol de entrada en tu servidor", apagado: false, args: true, uso: "set <humano | robot> <rol>", alias: ["wel-role", "autorole"], 
                        permiso: "MANAGE_GUILD", exm: ["`autorol humano Miembros`\nEstablece **Miembros** como autorol para los miembros humanos",
                             "`autorol bot @Máquinas`\nEstablece **Máquinas** como autorol para los miembros robots"], ctg: "Configuración" }