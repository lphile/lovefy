const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), ms = require("ms"), { crearDB } = require("megadb"), db = new crearDB("logs")

module.exports = async (client, message, args) => { const regs = ["memUnido", "memSalido", "msjEliminado", "msjEditado"], 
      can = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name === args[1])

if(regs.includes(args[0]) && can){ db.set(args[0] + "." + message.guild.id, can.id)
                                                                                                    
message.channel.send(new MessageEmbed().setDescription(can.toString() + " ha sido establecido como canal de registros sobre **"+args[0]+"**").setAuthor(message.guild.name, message.guild.iconURL())
                    .setColor(c.color)) }
                                                   
else { message.channel.send(new MessageEmbed().setDescription("Evento de registro o canal ínvalido").setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())) }


}; module.exports.help = { nombre: "regs", desc: "Establece registros", apagado: false, args: false, alias: ["log", "register"], uso: "<evento> <canal>", ctg: "Configuración",
                          exm: ["`regs msjEditado #edits`\nEstableces el canal **#edits** como canal de registro de mensajes editados"] }