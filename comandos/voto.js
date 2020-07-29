const { MessageEmbed } = require("discord.js"), c = require("/app/config.json");

module.exports = (client, message, args) => { const str = args.join(" "), rgx = /"(.*?)"/g, final = str.split(rgx), tema = final[1]

if(!tema) { message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL()).setColor(c.color)
            .setDescription("Debes de colocar el tema de la encuesta, para que puedan elegir opciones")) }

else if(!final[3]) { message.channel.send(new MessageEmbed().setTitle(tema).setColor(c.color).setDescription("✅ Sí\n❎ No")).then(async r=> { await r.react("✅"); await r.react("❎") }) }
    
else if(final.length >= 24) { message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL()).setColor(c.color).setDescription("Solamente se permiten **10** opciones"))}
 
else { const a = "🇦 " + final[3], rps = [a], emj = ["🇦"]; if(final[5]) { rps.push("🇧 " + final[5]); emj.push("🇧") } if(final[7]) { rps.push("🇨 " + final[7]); emj.push("🇨") } 
if(final[9]) { rps.push("🇩 " + final[9]); emj.push("🇩") } if(final[11]) { rps.push("🇪 " + final[11]); emj.push("🇪") } if(final[13]) { rps.push("🇫 " + final[11]); emj.push("🇫") } 
if(final[15]) { rps.push("🇬 " + final[15]); emj.push("🇬") } if(final[17]) { rps.push("🇭 " + final[17]); emj.push("🇭") } if(final[19]) { rps.push("🇮 " + final[19]); emj.push("🇮") }
if(final[21]) { rps.push("🇯 " + final[21]); emj.push("🇯") } 
      
else { let msg = rps.map(r=> r).join("\n"); message.channel.send(new MessageEmbed().setTitle(tema).setColor(c.color).setDescription(msg)).then(async r=> { if(emj[0] === "🇦") { await r.react(emj[0]) } 
  if(emj[1] === "🇧") { await r.react(emj[1]) } if(emj[2] === "🇨") { await r.react(emj[2]) } if(emj[3] === "🇩") { await r.react(emj[3]) } if(emj[4] === "🇪") { await r.react(emj[4]) } 
  if(emj[5] === "🇫") { await r.react(emj[5]) } if(emj[6] === "🇬") { await r.react(emj[6]) } if(emj[7] === "🇭") { await r.react(emj[7]) } if(emj[8] === "🇮") { await r.react(emj[8]) } 
  if(emj[9] === "🇯") { await r.react(emj[9]) } }) } } }

module.exports.help = { nombre: "voto", descripcion: "Haz una encuesta por medio de preguntas", apagado: false, args: false, uso: '"pregunta" ["opción 1" "hasta 10"]', alias: ["encuesta", "poll"],
exm: ['`voto "¿Hago un evento de simón dice?"`\nSe hará una encuesta con la pregunta/título **"¿Hago un evento de simón dice?"** y se establecerán las opciones **✅ Sí** y **❎ No**', 
'`voto "¿Qué hacemos?" "Sorteo de dinero" "Sorteo de Nitro" "Sorteo de ítems"`\nSe hará una encuesta con la pregunta/título **"¿Qué hacemos?"** y se establecerán las opciones **🇦 Sorteo de dinero**,'
      + ' **🇧 Sorteo de Nitro** y **🇨 Sorteo de ítems**'], ctg: "Utilidad" }