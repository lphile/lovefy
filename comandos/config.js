const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { crearDB } = require("megadb"), logs = new crearDB("logs"), cfg = new crearDB("configs")

module.exports = (client, message, args) => { const can = message.guild.channels.cache.get(args[2]) || message.mentions.channels.first() || message.guild.channels.cache.find(c=> c.name === args[2]),
emj = message.guild.emojis.cache.find(e=> e.name === args[2]), embed = new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())

if(["lista", "roll"].includes(args[0])) { message.channel.send(embed.setTitle("suggest - sugs - sugerencias").addField("sugs canal <canal>", "Establece un canal para las sugerencias del servidor")
  .addField("sugs emoyes <nombre de emoji>", "Establece la reacción de aceptación de sugerencias").addField("sugs emonop <nombre de emoji>", "Establece la reacción de rechazo de sugerencias")) }
                                    
/* if(["sorteo", "give", "gaway"].includes(args[0])) { if(["emosort", "emoji", "emote"].includes(args[1])) { message.channel.send(embed.setDescription(emj.toString() + 
" fue establecido como reacción de sorteos en este servidor").setColor(c.color)); cfg.set("emosor", emj.id) }  } */
                                             
if(["sugs", "suggest", "sugerencias"].includes(args[0])) { if(["canal", "channel", "sends"].includes(args[1])) { cfg.set("sugestión."+message.guild.id+".can", can.id)
  
  message.channel.send(embed.setDescription(`${can} fue establecido como canal de sugerencias en este servidor`)) } 
  
  if(!cfg.has("sugestión."+message.guild.id+".can")) { message.channel.send(embed.setDescription("Establece un canal de sugerencias para poder enviarlas y configurar demás acciones de esta sección")) }
  
  else { if(["emoyes", "acept-ji", "emoji-acept"].includes(args[1])) { cfg.set("sugestión."+message.guild.id+".yes", emj.id) 
  message.channel.send(embed.setDescription(`${emj} fue establecido como reacción de aceptación de sugerencias`)) }
       
  if(["emonop", "deny-ji", "emoji-denied"].includes(args[1])) { cfg.set("sugestión."+message.guild.id+".nop", emj.id)
  message.channel.send(embed.setDescription(`${emj} fue establecido como reacción de rechazo de sugerencias`)) } } }
  
if(["welcome", "bienvenida"].includes(args[0])) { if(!cfg.has("welc." + message.guild.id)) { cfg.set("welc." + message.guild.id, { can: false, fon: false, des: false, col: false, tit: false }) }
                                                 
  if(["canal", "channel"].includes(args[1])) { cfg.set("welc." + message.guild.id + ".canal", can.id)
  message.channel.send(embed.setDescription(`El canal de bienvenidas ha sido establecido al canal ${can}`)) }
  
  if(["fondo", "bottom"].includes(args[1])) { cfg.set("welc." + message.guild.id + ".fondo", args[2])
  message.channel.send(embed.setDescription("El fondo de bienvenidas ha sido establecido como").setImage(args[2]))  }
  
  if(["descripción", "description"].includes(args[1])) { if(args.slice(2).join(" ").length < 80) { cfg.set("welc." + message.guild.id + ".desc", args.slice(2).join(" "))
  message.channel.send(embed.setDescription("La descripción de bienvenidas ha sido establecida a: **" + args.slice(2).join(" ").replace(/{servidor.nombre}/g, message.guild.name)
  .replace(/{servidor.conteo}/g, message.guild.memberCount).replace(/{miembro.nombre}/g, message.author.username).replace(/{miembro.tag}/g, message.author.tag) + "**")) }
                                                       
  else { message.channel.send(embed.setDescription("La descripción de bienvenidas tiene un límite de 80 caracteres, contando las variables")) } }
  
  if(["título", "title"].includes(args[1])) { cfg.set("welc." + message.guild.id + ".title", args.slice(2).join(" "))
  message.channel.send(embed.setDescription(`El título de bienvenidas ha sido establecido a: **${args.slice(2).join(" ")}**`)) }
  
  if(["color", "color"].includes(args[1])) { cfg.set("welc." + message.guild.id + ".color", args[2])
  message.channel.send(new MessageEmbed().setDescription(`El color de despedidas ha sido establecido a **${args[2]}**`).setColor(args[2])) } }
                                             
if(["goodbye", "despedida"].includes(args[0])) { if(!cfg.has("lve." + message.guild.id)) { cfg.set("lve." + message.guild.id, { can: false, fon: false, des: false, col: false, tit: false }) }
                                                
  if(["canal", "channel"].includes(args[1])) { cfg.set("lve." + message.guild.id + ".canal", can.id)
  message.channel.send(embed.setDescription(`El canal de despedidas ha sido establecido al canal ${can}`)) }
  
  if(["fondo", "bottom"].includes(args[1])) { cfg.set("lve." + message.guild.id + ".fondo", args[2])
  message.channel.send(embed.setDescription("El fondo de despedidas ha sido establecido como").setImage(args[2]))  }
  
  if(["descripción", "description"].includes(args[1])) { if(args.slice(2).join(" ").length < 80) { cfg.set("lve." + message.guild.id + ".desc", args.slice(2).join(" "))
  message.channel.send(embed.setDescription("La descripción de despedidas ha sido establecida a: **" + args.slice(2).join(" ").replace(/{servidor.nombre}/g, message.guild.name)
  .replace(/{servidor.conteo}/g, message.guild.memberCount).replace(/{miembro.nombre}/g, message.author.username).replace(/{miembro.tag}/g, message.author.tag) + "**")) }
                                                       
  else { message.channel.send(embed.setDescription("La descripción de despedidas tiene un límite de 80 caracteres, contando las variables")) } }
  
  if(["título", "title"].includes(args[1])) { cfg.set("lve." + message.guild.id + ".title", args.slice(2).join(" "))
  message.channel.send(embed.setDescription(`El título de bienvenidas ha sido establecido a: **${args.slice(2).join(" ")}**`)) }
  
  if(["color", "color"].includes(args[1])) { cfg.set("lve." + message.guild.id + ".color", args[2])
  message.channel.send(embed.setDescription(`El color de despedidas ha sido establecido a **${args[2]}**`).setColor(args[2])) } }
                                             
}; module.exports.help = { nombre: "config", descripcion: "Configura distintas acciones del bot en tu servidor", apagado: false, args: false, permiso: "MANAGE_GUILD", uso: "<opción> <nuevo valor>", 
                          alias: ["set"], ctg: "Configuración" }