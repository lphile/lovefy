const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), mom = require("moment"), { crearDB } = require ("megadb"), inf = new crearDB("infrs"); mom.locale("es")

module.exports = async (client, message, args) => { const mem = message.mentions.members.first()||message.guild.members.cache.get(args[1])||message.guild.members.cache.find(m=> m.user.tag === args[1])

if(["buscar", "search"].includes(args[0])) { const cnt = await inf.map(false, (v, k) => "`"+k+"`** "+v.inf+":** a " + client.users.cache.get(v.mem).toString() + " el `" + mom(v.date).format('lll') + 
                                            "` de una duración de `"+ v.time +"` por " + client.users.cache.get(v.mod).tag)

inf.find(false, (v) => v).then(async function (ud) { if(ud === undefined) { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
                                                                             .setDescription(mem.toString() + " no tiene infracciones que mostrar")) }
                                                                            
else { message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL()).setDescription(cnt.join("\n\n").replace("indefinido", "No")).setColor(c.color)) } }) }
                                                   
if(["editar"].includes(args[0])) { inf.set(mem.id + ".rea", args.slice(3).join(" ")) }
                                                   
if(["eliminar", "delete"].includes(args[0])) { inf.delete(mem.id); message.channel.send(new MessageEmbed().setDescription("Infracción eliminada").setAuthor(message.guild.name, message.guild.iconURL())
                                                                   .setColor(c.color)) } }

module.exports.help = { nombre: "inf", desc: "Controla las infracciones de un miembro especificado", apagado: false, args: false, alias: ["infr", "sanción"], permiso: "MANAGE_ROLES",
                       uso: "buscar <miembro> | eliminar <miembro> <clave>" , exm: ["`inf buscar @Luigi`\nMuestra la lista de infracciones de **Luigi**, mediante mención", 
                      "`inf buscar 0123456789876543210`\nMuestra la lista de infracciones de **Luigi**, mediante ID", 
                      "`inf eliminar @Luigi o1bk9`\nElimina la sanción de código **o1bk9** que pertenece al miembro **Luigi**"], ctg: "Moderación" }