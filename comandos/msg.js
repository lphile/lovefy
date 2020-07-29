const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { crearDB } = require ("megadb")

module.exports = (client, message, args) => {

if(["decir", "say"].includes(args[0])) { if(!message.member.permissions.has("MENTION_EVERYONE")) { if(["--embed", "--e"].includes(args[1])) 

{ message.delete(); message.channel.send(new MessageEmbed().setDescription(args.slice(2).join(" ").replace(/@everyone|@here|<@&[0-9]+>/gm, "**mención**"))) }
  
else { message.delete(); message.channel.send(args.slice(1).join(" ").replace(/@everyone|@here|<@&[0-9]+>/gm, "**mención global**")) } }
                                             
else { if(["--embed", "--e"].includes(args[1])) { message.delete(); message.channel.send(new MessageEmbed().setDescription(args.slice(2).join(" "))) }
       else { message.delete(); message.channel.send(args.slice(1).join(" ")) } } }
  
if(["eliminado", "deleted"].includes(args[0])){ const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel, msge = client.snipes.get(canal.id)
  
  if(canal.type === "voice") { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
                                      .setDescription("¿Ver mensajes borrados de un canal de voz?, *eso es raro...* 🤔")) }

  else if(!msge) { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
                                       .setDescription("No se ha encontrado un mensaje borrado recientemente en este canal")) } 
                                   
  else { message.channel.send(new MessageEmbed().setDescription(msge.content).setFooter(msge.delete.tag, msge.delete.displayAvatarURL()).setColor(c.color)) } }

if(["editado", "edited"].includes(args[0])) { const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel, msge = client.edits.get(canal.id)

  if(canal.type === "voice") { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
                                      .setDescription("¿Ver mensajes editados de un canal de voz?, *eso es raro...* 🤔")) }

  else if(!msge) { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
                                       .setDescription("No se ha encontrado un mensaje editado recientemente en este canal")) } 
                                   
  else { message.channel.send(new MessageEmbed().setFooter(msge.autor.tag, msge.autor.displayAvatarURL()).setColor(c.color)
                              .setDescription("**Antes:** " + msge.antes + "\n\n**Después:** " + msge.después)) } }
}

module.exports.help = { nombre: "msg", desc: "Acciona frente a los mensajes, puedes mirar mensajes eliminados, editados o hacer repetir mensajes", apagado: false, args: false, 
                       uso: "<decir texto | <eliminado | editado> [canal]>", alias: ["say", "msj"], exm: ["`msg eliminado`\nMuestra el último mensaje **borrado** del canal de ejecución",
                       "`msg eliminado #charlas`\nMuestra el último mensaje **borrado** del canal **#charlas**",'`msg decir ¡Nueva actualización!`\nRepite **¡Nueva actualización!** en el canal',
                       "`msg editado #multi`\nMuestra el último mensaje **editado** del canal **#multi**"], ctg: "Utilidad" }