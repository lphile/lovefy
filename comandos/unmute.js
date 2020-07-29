const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { crearDB } = require("megadb"), db = new crearDB("mroles"), db2 = new crearDB("muteds")

module.exports = async (client, message, args) => { const mb = message.mentions.members.first() || message.guild.members.cache.get(args[0]), r = args[1], rol = await db.get(message.guild.id)

if(!mb || !args[0]) { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
                      .setDescription("Argumento `<miembro>` inválido").addField("Ejemplos", module.exports.help.exm.join("\n\n")).setColor(c.color))}

if (db2.has(message.guild.id + "_" + mb.id, "_")) { mb.roles.remove(rol); db2.eliminar(message.guild.id + "_" + mb.id, "_")
message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
                     .setDescription(`${mb}` + ", ha sido des-silenciado correctamente a razón: " + `${r ? r : "`Sin razón`"}`)) }
                                                  
else { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
                            .setDescription(`${mb}` + " no está silenciado, para ver la lista de silenciados de su servidor use `mute lista`"))}}

module.exports.help = { nombre: "unmute", desc: "Des-silencia a un miembro", apagado: true, args: false, uso: "<miembro> [razón]", alias: ["desilenc", "desmute"], permiso: "MANAGE_ROLES",
                       exm: ["`unmute @Luigi`\n**Des-silencia** a **Luigi** a través de mención","`unmute 606522810948648970`\n**Des-silencia** a **Luigi** a través de ID"], ctg: "Moderación" }