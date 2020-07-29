const { MessageEmbed } = require("discord.js"), { crearDB } = require("megadb"), cfg = new crearDB("configs"), c = require("/app/config.json"), gest = new crearDB("suggest")

module.exports = async (client, message, args) => { let color, estado, acción; const emb = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL()).setColor(c.color),
                                                                               can = message.guild.channels.cache.get(await cfg.get("sugestión."+message.guild.id+".can"))

 switch(args[0]) { case "aceptar" || "aproved": color = "GREEN", estado = "aprobada", acción = "aprobó"; case "rechazar" || "denied" : color = "RED", estado = "rechazada", acción = "rechazó";
 case "quizás" || "maybe": color = "ORANGE", estado = "potencial", acción = "tomó en cuenta"; case "invalidar" || "invalid": color = "GREY", estado = "invalidada", acción = "invalidó";
   default: message.channel.send(emb.setDescription("Opción inválida, ingrese una de las opciones dadas en la explicación del comando")); return; }
                                                     
 const razón = args.slice(2).join(" "), aut = client.users.cache.get(await gest.get(args[1] + ".autor")), sug = await gest.get(args[1] + ".sug"), embed = new MessageEmbed().setTimestamp()
 .setAuthor(aut.tag, aut.displayAvatarURL({ dynamic: true })).setTitle("Sugerencia " + estado).setColor(color).setDescription(sug), msg = await can.messages.fetch(args[1])
  
/*if(["lista", "roll"].includes(args[0])) { gest.filter(false,(v) =>v.sv === s.id).then(ud => { if(Object.keys(ud).length <= 0) { message.channel.send(new MessageEmbed().setAuthor(s.name, s.iconURL())
  .setColor(c.color).setDescription("No hay sugerencias pendientes por ahora")) } else { for(var key in ud) { let autt = ud[key].autor, sugg = ud[key].sug, mull = ud[key].img
  const ugs = new MessageEmbed().setAuthor(s.name, s.iconURL()).setColor(c.color)
  ugs.addField(`${key} - ${client.users.cache.get(autt).tag}`, sugg + "\n\n `Archivo` " + `${mull ? "[presione para ver](" + mull + " )" : "No hay archivo adjunto"}`) } } }) } */
                                                    
  if(!args[1]) { message.channel.send(emb.setDescription("Debes de ingresar la id del mensaje de la sugerencias, si quieres ver las pendientes usa `sug lista`")) }
  
  else { if(gest.has(args[1] + ".img")) { const img = await gest.get(args[1] + ".img")
  
  if(!razón) { msg.edit(embed.setImage(img)) } else { msg.edit(embed.addField("Respuesta", razón).setImage(img)) } } else { if(!razón) { msg.edit(embed) } 
  else { msg.edit(embed.addField("Respuesta", razón)) } }
        
  aut.send(new MessageEmbed().setTitle(`¡Sugerencia ${estado}!`).setDescription(`${message.author} ${acción} tu sugerencia, [vamos a verla](${msg.url})`).setColor(c.color)) 
                                    
  message.channel.send(emb.setDescription(`La sugerencia de ID ${args[1]} fue ${estado}, [¡vamos a verla!](${msg.url})`)); await gest.delete(args[1]) } }

module.exports.help = { nombre: "sugestión", desc: "Administra las sugerencias del servidor", apagado: false, args: false, alias: ["sugrate", "ratesug"], ctg: "Sugerencias", permiso: "MANAGE_GUILD",
                     uso: "aceptar/rechazar/quizás/invalidar <id> [razón opcional]", 
                     exm: ["`calificar aceptar 0123456789876543210`\nEstablece como sugerencia aceptada a la sugerencia pertenciente al mensaje de ID **0123456789876543210**, sin razón especificada"]}