const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), ms = require("ms"), { crearDB } = require("megadb"), cfg = new crearDB("configs"), mut = new crearDB("muteds"), 
      inf = new crearDB("infrs")

module.exports = async (client, message, args) => { const embed = new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })), 
      mem = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.tag === args[0]), t = args[1], 
      r = args.slice(2).join(" ") ? args.slice(2).join(" ") : "sin razón", rol = message.guild.roles.cache.get(await cfg.get(message.guild.id))

if(["role", "rol"].includes(args[0])) { if(["set", "est"].includes(args[1])) { 
  
  if(!args[2]) { message.channel.send(embed.setDescription("Argumento `nombre` no válido, debe de usar el nombre de un rol de su servidor")) }
  
 else { const srole = message.guild.roles.cache.find(r => r.name === args.slice(2).join(" ")) || message.mentions.roles.first(); await cfg.set("muterol."+message.guild.id, srole.id)

  if(!srole) { message.channel.send(embed.setDescription("Este rol no se encuentra en el servidor, por favor ingrese uno de su lista de roles")) } 
  else { message.channel.send(embed.setDescription(`${c.carg} ${srole} ha sido establecido como rol para silenciados\n\n${c.carg} Permisos de texto establecidos correctamente`)).then((msg) => { 
  setTimeout(function() { msg.edit(embed.setDescription(`${c.listo} ${srole} ha sido establecido como rol para silenciados\n\n${c.carg} Permisos de texto establecidos correctamente`)) }, 2000)
  setTimeout(function() { msg.edit(embed.setDescription(`${c.listo} ${srole} ha sido establecido como rol para silenciados\n\n${c.listo} Permisos de texto establecidos correctamente`)) }, 8000) })
  message.guild.channels.cache.forEach(async (channel, id) => { await channel.createOverwrite(srole, { SEND_MESSAGES: false, ADD_REACTIONS: false }) }) }} }
  
if(["crear", "hacer"].includes(args[1])) { if(!args[2] || !args.slice(3).join(" ")) { message.channel.send(embed.setDescription("Argumento `color` inválido, debe de ser de código hexadecimal")) } 
  
 else { const crole = await message.guild.roles.create({data: { name: args.slice(3).join(" "), color: args[2], permissions: [], position: message.guild.me.roles.highest.position}, 
 reason: "Creación de rol para silenciar en el servidor"}), crole2 = message.guild.roles.cache.find(r => r.name === crole.name); await cfg.set("muterol."+message.guild.id, (await crole2.id) )
       
 message.channel.send(embed.setDescription(`${c.carg} ${crole2} ha sido establecido como rol para silenciados\n\n${c.carg} Permisos de texto establecidos correctamente`)).then((msg) => { 
 setTimeout(function() { msg.edit(embed.setDescription(`${c.listo} ${crole2} ha sido establecido como rol para silenciados\n\n${c.carg} Permisos de texto establecidos correctamente`)) }, 2000)
  
 setTimeout(function() { msg.edit(embed.setDescription(`${c.listo} ${crole2} ha sido establecido como rol para silenciados\n\n${c.listo} Permisos de texto establecidos correctamente`)) }, 8000) })
 message.guild.channels.cache.forEach(async (channel, id) => { await channel.createOverwrite(crole, { SEND_MESSAGES: false, ADD_REACTIONS: false }) }) }} }

if(["lista", "roll"].includes(args[0])) { mut.map(message.guild.id, (v, k) => message.channel.send(embed.setTitle("Miembros silenciados").setDescription(k.join(", ")) )) }
                                                   
else if (!cfg.has(message.guild.id)) { message.channel.send(embed.setDescription("No hay un rol establecido en tu servidor, use `muterole` para establecer uno")) } 

else if (!mem) { message.channel.send(embed.setDescription("Argumento `miembro` inválido, asegúrese de proporcionar bien los datos")) }

else if (mem && mem.id === message.author.id) { message.channel.send(embed.setDescription("Estoy segura que no puedes silenciarte, a menos que sea tu clon...")) }
  
else if (mem && mem.id  === client.user.id) { message.channel.send(embed.setDescription("¿Silenciarme a mi?, ¿cómo podré responder a los comandos ejecutados? 😱")) }
  
else if (mem.permissions.has("MANAGE_MESSAGES")) { message.channel.send(embed.setDescription("No puedo **silenciar** a un miembro que tenga el permiso de **Gestionar mensajes**")) }

else if (!message.guild.me.permissions.has(["MANAGE_ROLES", "MANAGE_CHANNELS"])) { message.channel.send(embed.setDescription("Necesito por lo menos los permisos de **Gestionar roles y canales**")) }

else if (mem.roles.highest.comparePositionTo(message.member.roles.highest) > 0) { message.channel.send(embed.setDescription("Raro que intente silenciar a un miembro con igual jerarquía que usted")) }
  
else if (rol.comparePositionTo(message.guild.me.roles.highest) > 0) { message.channel.send(embed.setDescription("El rol del servidor es más alto jerárquicamente que mi rol `integrado`")) }

else if (t === "indefinido" || !t) { await mem.roles.add(rol); message.channel.send(embed.setDescription(`${mem} se calló por tiempo indefinido`))
  if(!mut.has(message.guild.id)) { mut.set(message.guild.id, [mem.id]) } else { mut.push(message.guild.id, [mem.id]) }
  
  inf.set(`${inf.size() + 1}.${mem.id}`, { sv: message.guild.id, inf: "mute", date: +new Date(), mod: message.author.id, time: `${+new Date() + ms(t)}`, rea: r}) }
  
else { await mem.roles.add(rol); message.channel.send(embed.setDescription(`${mem} se calló por ${ms(ms(t))} con razón de: ${r}`))
  if(!mut.has(message.guild.id)) { mut.set(message.guild.id, [mem.id]) } else { mut.push(message.guild.id, [mem.id]) }
  
  inf.set(`${inf.size() + 1}.${mem.id}`, { sv: message.guild.id, inf: "mute", date: +new Date(), mod: message.author.id, time: `${+new Date() + ms(t)}`, rea: r})
      
  setTimeout(function() { mem.roles.remove(rol); mut.extract(message.guild.id, mem.id); message.channel.send(embed.setDescription(`${mem} puede hablar de nuevo`)) }, ms(t)) } }
                                     
module.exports.help = { nombre: "mute", desc: "Silencia temporalmente al miembro mencionado", apagado: false, args: false, permiso: "MANAGE_MESSAGES", alias: ["silenciar", "callar"],
                        uso: "lista | <miembro> <n(u) - indefinido> [razón]", exm: ["`mute @Phile 6h Ser muy rudo`\nSilencia a Phile durante **6 horas** por **Ser rudo**", 
                                                                                    "`mute lista`\nMuestra la lista de silenciados en el servidor"], ctg: "Moderación" }