const { MessageEmbed } = require("discord.js"), { crearDB } = require("megadb"), cfg = new crearDB("configs"), gest = new crearDB("suggest"), c = require("/app/config.json")

module.exports = async (client, message, args) => { const sv = message.guild, can = sv.channels.cache.get(await cfg.get("sugestión."+sv.id+".can")), reacsí = await cfg.get("sugestión."+sv.id+".yes"),
      reacno = await cfg.get("sugestión."+sv.id+".nop"), aut = message.author, embed = new MessageEmbed().setColor(c.color).setAuthor(sv.name, sv.iconURL()).setTimestamp()
  
if(!args[0]) { message.channel.send(embed.setDescription("Debe de especificar la sugerencia a enviar 🤔")) }
  
else if (!can) { message.channel.send(embed.setDescription("No hay un canal de sugerencias registrado en este servidor")) }

else { const cam = args.join(" "); if(message.attachments.size > 0) { message.channel.send(embed.setDescription(`${aut}, la sugerencia ha sido enviada correctamente`))
       can.send(embed.setAuthor(aut.tag, aut.displayAvatarURL({ dynamic: true })).setTitle("Sugerencia en proceso").setDescription(cam).setImage(message.attachments.first().proxyURL))
       .then(async function(msg) { await msg.react(reacsí ? reacsí : "✅"), await msg.react(reacno ? reacno : "❎"), 
       await gest.set(can.lastMessageID, { autor: aut.id, img: message.attachments.first().proxyURL, sug: cam } )} )}
        
else { message.channel.send(embed.setDescription(`${aut}, la sugerencia ha sido enviada correctamente`))
       can.send(embed.setAuthor(aut.tag, aut.displayAvatarURL({ dynamic: true })).setTitle("Sugerencia en proceso").setDescription(cam).setTimestamp()).then(async function(message) 
       { await message.react(reacsí ? reacsí : "✅"), await message.react(reacno ? reacno : "❎"), await gest.set(can.lastMessageID, { sv: sv.id, autor: aut.id, sug: cam }) }) } } }

module.exports.help = { nombre: "sugerir", desc: "Ejecuta sugerencias en el servidor", apagado: false, args: false, alias: ["suggest"], uso: "<sugerencia(puede incluir imagen adjunta)> ", 
                       exm: ["`sugerir Actualizar el servidor`\nEnvía **Actualizar el servidor** como sugerencia en el canal establecido del servidor"], ctg: "Sugerencias" }