const { MessageEmbed } = require("discord.js"), { color } = require("/app/config.json")

module.exports = async (client, message, args) => { const can = message.mentions.channels.first() || message.guild.channels.cache.get([1]) || message.channel, núm = parseInt(args[2], 10) ||
      parseInt(args[1], 10); 
                             
if(["member", "miembro", "user"]) { }
if(["canal", "channel"].includes(args[0])) { if(["todo", "all"].includes(args[1] || args[2])) { if(message.guild.me.permissions.has("MANAGE_CHANNELS")) { 
    message.channel.send(new MessageEmbed().setDescription(`Confirma reaccionando si quieres o no eliminar todos los mensajes de ${can} (clonar el canal y eliminar el original)"`)
    .addField('\u200b', 'Reaccione a <:si:708080185886638094> para aceptar la confirmación o <:no:708080202189635647> para rechazarla, el tiempo para reaccionar es de **30 segundos**')
    .setColor(color).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL())).then(async function(ms) { await ms.react("708080185886638094"); await ms.react("708080202189635647")
                                                                                                                      
 const fil = (reaction, user) => { return ['708080185886638094', '708080202189635647'].includes(reaction.emoji.id) && user.id === message.author.id }

ms.awaitReactions(fil, { max: 1, time: 30000, errors: ['time'] }).catch(() => { ms.edit(new MessageEmbed().setDescription("El tiempo se ha acabado, vuelva a ejecutar el comando y confirme")
       .setColor(color)).then(m => m.delete({ timeout: 6000 })) }).then(async col => { const rcc = col.first()
                                                      
if(rcc.emoji.id === "708080185886638094") { await can.clone({ name: can.name, reason: 'Simulación' }).then(async function(c) { await can.delete(); c.send(new MessageEmbed()
.setDescription("Simulación hecha sobre borrar todos los mensajes de un canal").setColor(color).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL())) }) } 
                                                                                   
else if(rcc.emoji.id === "708080202189635647") { message.channel.send(new MessageEmbed().setDescription("Acción cancelada, gracias por la confirmación").setColor(color)
  .setTimestamp().setAuthor(message.guild.name, message.guild.iconURL())); message.channel.messages.cache.get(ms.id).delete() } }) }) } } 
               
else if (!núm || núm < 1 || núm > 100) { message.channel.send(new MessageEmbed().setColor(color).setAuthor(message.guild.name, message.guild.iconURL())
                        .setDescription("El número como referencia de mensajes a **borrar** debe de ser mayor a **0** y menor que **101**")) } 
                                            
else if (message.guild.me.permissions.has("MANAGE_MESSAGES")) { can.messages.fetch({ limit: núm }); can.bulkDelete(núm).then(() => { message.channel.send(new MessageEmbed()
.setColor(color).setAuthor(message.guild.name, message.guild.iconURL()).setDescription("He borrado **" + núm + "** mensajes en el canal " + can.toString())).then(m => m.delete({ timeout: 5000, 
reason: 'Petición de borrar mensajes' })) }) } else { message.channel.send(new MessageEmbed().setColor(color).setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
       .setDescription("Es necesario que mi rol integrado tenga el permiso **Gestionar Mensajes** en caso de que quiera borrar mensajes cuantitativos del canal")) }  } }

module.exports.help = { nombre: "borrar", desc: "Borra la cantidad de mensajes mencionada", apagado: false, args: false, permiso: "MANAGE_MESSAGES", uso: "canal [canal] <cantidad | todo>", 
alias: ["clear", "purge"], exm: ["`borrar canal #chat 69`\nBorra **69** mensajes del canal **#chat**", "`borrar canal 96`\nBorra **96** mensajes del canal en el que se ejecutó el comando",
"`borrar canal todo`\nSimula borrar todos los mensajes del canal, pero en realidad clona el canal y borra el canal en el que se ejecutó el comando"], ctg: "Moderación" }