const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), ms = require("ms")

module.exports = async (client, message, args) => { const t = args[0], rec = args.slice(1).join(" ")

if(!t && !rec || !t || !rec) { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
                               .setDescription("Ingrese el tiempo en el que se recordará y lo que se recordará, por favor")) }
                                                   
else if(ms(t) < 10000 || ms(t) > 31557600000) { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
                               .setDescription('El tiempo que usted debe de especificar debe de ser entre **10 segundos** y **1 año**')) }
                                                   
else { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL()).setDescription(c.listo + " Te lo recordaré dentro de **" + ms(ms(t)) + "**"))
      setTimeout(function() { message.author.send(new MessageEmbed().setColor(c.color).setTitle("Recordatorio desde " + message.guild.name).setTimestamp().setDescription(rec)) }, ms(t)) }

}; module.exports.help = { nombre: "recordar", desc: "Añade un recordatorio con un intervalo de tiempo", apagado: false, args: false, alias: ["remind", "remember"], ctg: "Utilidad",
                        uso: "<tiempo> <recordatorio>", exm: ["`recordar 10m Apagar la olla`\nSe te enviará el recordatorio **'Apagar la olla'** al mensaje directo después de **10 minutos**"] }