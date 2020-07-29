const { MessageEmbed } = require("discord.js"), { crearDB } = require("megadb"), { color, chs, mult, ntf, mod, reg} = require("/app/config.json"), c = require("/app/config.json"),
      mom = require("moment"); mom.locale("es")

module.exports = (client, message, args) => { const sv = message.guild, mem = message.guild.members.cache, bst = sv.premiumSubscriptionCount, ven = sv.features,
    mc = mem.filter(u => u.presence.status === "online").size, ma = mem.filter(u => u.presence.status === "idle").size, rof = sv.roles.cache, mn = mem.filter(u => u.presence.status === "dnd").size,
    md = mem.filter(u => u.presence.status === "offline").size, ro = rof.filter(c => c.managed == false).map(c => c.toString()).slice(0, 15), ca = sv.channels.cache, 
    ctg = ca.filter(u => u.type !== "category"), em = sv.emojis.cache.filter(e => !e.animated).map(e => e.toString()), ema = sv.emojis.cache.filter(e => e.animated).map(e => e.toString())
   
    
message.channel.send(new MessageEmbed().setThumbnail(sv.iconURL({ format: 'webp', dynamic: true, size: 1024 })).setColor(color).setTitle("Propiedad")
.setDescription(`${sv.owner} tiene la propiedad de **${sv.name}** que se creó el ${mom(sv.createdAt).format('LL')} a las ${mom(sv.createdAt).format('LTS')}`))
                                             
message.channel.send(new MessageEmbed().setTitle("Ajustes").addField("Región del servidor", reg[sv.region], true).setColor(color)
.addField("Inactividad", `**Canal:** ${sv.afkChannelD ? "<#"+sv.afkChannelD+">" : "No establecido"}\n**Límite de tiempo:** ${sv.afkTimeout / 60} m`, true)
.addField("Sistema", `**Canal:** ${sv.systemChannelID ? "<#"+sv.systemChannelID+">" : "No establecido"}`, true).addField("Notificación", ntf[sv.defaultMessageNotifications], true)
.addField("Nivel", mod[sv.verificationLevel], true).addField("Filtro de multimedia", mult[sv.explicitContentFilter], true))
                                             
message.channel.send(new MessageEmbed().setTitle("Estadísticas").setColor(color)
                     
.addField("Miembros", `${c.mem} ${mem.filter(u => u.user.bot == false).size} humanos${c.inv}${c.bot} ${mem.filter(u => u.user.bot == true).size} robots\n${c.on} ${mc}${c.inv}${c.au} ${ma}${c.inv}`
+ `${c.nm} ${mn}${c.inv}${c.of} ${md}`, true).addField("Mejoras", `${c.seb} ${bst}${c.inv}Nivel ${sv.premiumTier}${c.inv}${ven.join(", ") ? ven : "Sin ventajas"}`, true)

.addField("Roles", `${c.rol} ${rof.filter(u => u.managed == false).size} asignables${c.inv}${c.int} ${rof.filter(u => u.managed == true).size} integrados\n\n${ro.join(", ")}`)

.addField("Canales", `${chs.catg} ${ca.filter(u => u.type == "category").size} categorías${c.inv}${chs.total} ${ctg.size} en total${c.inv}${chs.nsfw} ${ca.filter(u => u.nsfw == true).size} NSFW\n
${chs.texto} ${ca.filter(u => u.type == "text").size} texto${c.inv}${chs.voz} ${ca.filter(u => u.type == "voice").size} voz${c.inv}${chs.new} ${ca.filter(u => u.type == "news").size} anuncio`, true)

/*.addField("Emojis estáticos en total: "+sv.emojis.cache.filter(
e => !e.animated).size, `${em.join(", ") ? em : "Sin emoticones estáticos"}`).addField("Emojis animados en total: "+sv.emojis.cache.filter(e => e.animated).size, `${ema.join(", ") ? ema : 
"Sin emojis animados"}`)*/)}

module.exports.help = { nombre: "servidor", desc: "Muestra toda la información del servidor", apagado: false, args: false, uso: "[nada]", alias: ["server", "s-info", "serv"], ctg: "Información"  }