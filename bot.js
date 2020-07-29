// Host 

const http = require("http"), express = require("express"), app = express(); app.use(express.static("public"))

app.get("/", function(request, response) { response.sendFile(__dirname + "/views/index.html") }); app.get("/", (request, response) => { response.sendStatus(200) })

setInterval(() => { http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`) }, 280000)

const { Collection, Client, MessageEmbed } = require("discord.js"), client = new Client(), { readdirSync } = require("fs"), { crearDB } = require("megadb"), { Bienvenida, WeezAPI} = require("weez"), 
      weez = new WeezAPI("Z6JEL7HRrczYKib5Gfej5GmeeZWI94oVqhOo"), mom = require("moment")
      
// Bases de dato

const mutea = new crearDB("muteds"), log = new crearDB("logs"), cfg = new crearDB("configs")

// Cliente interno

client.snipes = new Map(); client.edits = new Map(); client.comandos = new Collection(); mom.locale("es")

// Eventos
 
/* Evento ready */
client.on("ready", async() => { /*onst eds = [`${client.users.cache.size} usuarios y ${client.guilds.cache.size} servidores`, `!ayuda para más info`]
setInterval(function() { let edo = eds[Math.floor(Math.random(eds) * eds.length)]; client.user.setPresence({ activity:{ name: edo }, status: 'online' }) }, 10000) */ })

/* Evento messageDelete */
client.on('messageDelete', async(message) => { const can = message.guild.channels.cache.get(await log.get("msjEliminado." + message.guild.id))

if(message.author.bot) { return }; client.snipes.set(message.channel.id, { content: message.content, delete: message.author, canal: message.channel })

if(log.has("msjEliminado." + message.guild.id)) { if(message.attachments.size > 0) { can.send(new MessageEmbed().setTitle(`Mensaje eliminado en #${message.channel.name}`).setColor("RED")
      .setDescription(message.content).setImage(message.attachments.first().proxyURL).setTimestamp(message.createdTimestamp).setAuthor(message.author.username, message.author.displayAvatarURL())) } 
  else { can.send(new MessageEmbed().setTitle(`Mensaje eliminado en #${message.channel.name}`).setColor("RED").setDescription(message.content)
        .setAuthor(message.author.tag, message.author.displayAvatarURL()).setTimestamp(message.createdTimestamp)) } } })

/* Evento messageUpdate */
client.on('messageUpdate', async(oldMessage, newMessage) => { if(newMessage.content === oldMessage.content) { return } if(newMessage.author.bot) { return } 

else { const can = newMessage.guild.channels.cache.get(await log.get("msjEditado." + newMessage.guild.id)), aut = newMessage.author

if(log.has("msjEditado." + newMessage.guild.id)) { if(oldMessage.attachments.size > 0) { can.send(new MessageEmbed().setTitle(`Mensaje editado en #${newMessage.channel.name}`).setColor("BLUE")
.setDescription(`[Redirección al mensaje](${newMessage.url})`).addField("Antes", oldMessage.content, true).addField("Ahora", newMessage.content, true).setImage(newMessage.attachments.first().proxyURL)
.setTimestamp(newMessage.createdTimestamp).setAuthor(aut.tag, aut.displayAvatarURL())) }
                                                
else { can.send(new MessageEmbed().setTitle(`Mensaje editado en #${newMessage.channel.name}`).setColor("BLUE").setDescription(`[Redirección al mensaje](${newMessage.url})`)
       .addField("Antes", oldMessage.content, true).addField("Ahora", newMessage.content, true).setTimestamp(newMessage.createdTimestamp).setAuthor(aut.tag, aut.displayAvatarURL())) } } }
                                                           
client.edits.set(newMessage.channel.id, { autor: newMessage.author, canal: newMessage.channel, antes: oldMessage.content, después: newMessage.content})  })

/* Evento guildCreate */
client.on('guildCreate', async(guild) => { const afj = new crearDB("afijo"); await afj.set(guild.id, "!"); console.log("Entré a " + guild.name)})

/* Evento guildMemberAdd */
client.on("guildMemberAdd", async(member) => { const wll = await cfg.get("welc." + member.guild.id + ".desc"), can = member.guild.channels.cache.get(await log.get("memUnido." + member.guild.id))
  if(log.has("memUnido." + member.guild.id)) { can.send(new MessageEmbed().setColor("AQUAMARINE").setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true })).setTitle("Miembro unido")
  .setDescription(member.user.toString() + " creó su cuenta " + mom(member.user.createdTimestamp).fromNow()).setTimestamp()) }
                                              
  if (mutea.has(member.guild.id + "." + member.id)) { member.roles.add(await cfg.get("muterol."+member.guild.id)) } 
                                              
  if(cfg.has("autorol.bth." + member.guild.id)) { member.roles.add(await cfg.get("autorol.bth." + member.guild.id)) } if (!member.user.bot) { if(cfg.has("autorol.mem." + member.guild.id)) 
  { member.roles.add(await cfg.get("autorol.mem." + member.guild.id)) } } else { if(cfg.has("autorol.bot." + member.guild.id)) { member.roles.add(await cfg.get("autorol.bot." + member.guild.id)) } }

  if(cfg.has("welc." + member.guild.id + ".canal")) { let wlc = new Bienvenida().avatar(member.user.displayAvatarURL({format: 'png'})).fondo(await cfg.get("welc." + member.guild.id + ".fondo"))
  .textoTitulo("Bienvenid@ " + member.user.username).textoDesc(wll.replace(/{servidor.nombre}/g, member.guild.name).replace(/{servidor.conteo}/g, member.guild.memberCount)
  .replace(/{miembro.nombre}/g, member.user.username).replace(/{miembro.tag}/g, member.user.tag)).textoColor(await cfg.get("welc." + member.guild.id + ".color")), img = await weez.getBienvenida(wlc)
  member.guild.channels.resolve(await cfg.get("welc." + member.guild.id + ".canal")).send({files: [img]}) }  })

/* Evento guildMemberRemove */
client.on("guildMemberRemove", async(member) => { const lvv = await cfg.get("lve." + member.guild.id + ".desc"), can = member.guild.channels.cache.get(await log.get("memSalido." + member.guild.id))
  if(log.has("memSalido." + member.guild.id)) { can.send(new MessageEmbed().setColor("PEACHPUFF").setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true })).setTitle("Miembro salió")
  .setDescription(member.user.toString() + " creó su cuenta " + mom(member.user.createdTimestamp).fromNow() + " y entró al servidor " + mom(member.joinedTimestamp).fromNow() + " teniendo como conjunto"
  + " de roles: " + member.roles.cache.sort((a, b) => a.position -  b.position).map(r => r.toString()).slice(1).join(", ")).setTimestamp()) }

  if(cfg.has("lve." + member.guild.id + ".canal")) { let lve = new Bienvenida().avatar(member.user.displayAvatarURL({format: 'png'})).fondo(await cfg.get("lve." + member.guild.id + ".fondo"))
  .textoTitulo("Adiós " + member.user.username).textoDesc(lvv.replace(/{servidor.nombre}/g, member.guild.name).replace(/{servidor.conteo}/g, member.guild.memberCount)
  .replace(/{miembro.nombre}/g, member.user.username).replace(/{miembro.tag}/g, member.user.tag)).textoColor(await cfg.get("lve." + member.guild.id + ".color")), img = await weez.getBienvenida(lve)
  member.guild.channels.resolve(await cfg.get("lve." + member.guild.id + ".canal")).send({files: [img]}) } })

// Controladores

for (const file of readdirSync("./comandos/")) { if (file.endsWith(".js")) { let fileName = file.substring(0, file.length - 3), 
    fileContents = require(`./comandos/${file}`); client.comandos.set(fileName, fileContents) } }

for (const file of readdirSync("./evento/")) { if (file.endsWith(".js")) { let fileName = file.substring(0, file.length - 3), fileContents = require(`./evento/${file}`)
     client.on(fileName, fileContents.bind(null, client)); delete require.cache[`./evento/${file}`] }
     client.login(process.env.clave).then(() => { console.log(client.user.tag + " iniciando " + client.comandos.size + " cmds") }).catch(err => { console.error("Error al iniciar sesión: " + err) }) }