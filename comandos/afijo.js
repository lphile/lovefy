const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { crearDB } = require("megadb"), cfg = new crearDB("configs")

module.exports = async (client, message, args) => { const embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL()).setColor(c.color) 

 if (!args[0] || ["<", /<@[0-9]+>|<@&[0-9]+>|<#[0-9]+>/gm].includes(args[0])) { message.channel.send(embed.setDescription("Argumento `afijo` inválido, no está permitido `<` o menciones")) }
                                                    
 else if(["default", "por defecto"].includes(args.slice(0).join(" "))) { if(!cfg.has("afijo."+message.guild.id)) { cfg.set("afijo."+message.guild.id, "v!") }
                                                                        
 else { await cfg.set("afijo."+message.guild.id, "v!"); message.channel.send(embed.setDescription("Mi afijo en este servidor ha sido establecido por defecto")) } }

 else { cfg.set("afijo."+message.guild.id, args[0]); message.channel.send(embed.setDescription(`Mi afijo en este servidor ha sido establecido a: **${args[0]}**`)) } }

module.exports.help = { nombre: "afijo", desc: "Configura el afijo del bot en tu servidor", apagado: false, args: false, uso: "<afijo | por defecto>", alias: ["prefijo", "prefix"], ctg: "Configuración",
                       permiso: "MANAGE_GUILD", exm: ["`afijo v!`\nEstablece el afijo del servidor a **v!**", "`afijo default`\nEstablece el afijo del servidor a **v!** (afijo por defecto)"] }