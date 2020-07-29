const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { crearDB } = require("megadb"), cfg = new crearDB("configs")

module.exports = async (client, message, args) => { const afj = await cfg.get("afijo."+message.guild.id), embed = new MessageEmbed().setAuthor(client.user.username, client.user.displayAvatarURL())
.setColor(c.color).setTitle("Presione aquí para informarse, aportar ideas y más").setURL("https://discord.gg/KGuBpST"), cmds = client.comandos

  if (args[0]) { let cnd = args[0].toLowerCase(); cnd = client.comandos.get(cnd) || client.comandos.find(cmd => cmd.help.alias && cmd.help.alias.includes(cnd))

  if (!cnd) { message.channel.send(new MessageEmbed().setDescription("Comando no encontrado, ingrese uno de la lista de comandos por favor").setColor(c.color)) }

  message.channel.send(new MessageEmbed().setTitle(afj + cnd.help.nombre).setDescription("```" + cnd.help.desc + "```").setColor(c.color).addField("Ejemplos", cnd.help.exm.join("\n\n"), true)
         .addField("Argumentación","`" + afj + cnd.help.nombre + " " + cnd.help.uso + "`", true).addField("Apodos", cnd.help.alias.join(", "), true)) } 
  
  else { if(!message.channel.nsfw) { message.channel.send(embed.setDescription("Use **" + afj + "ayuda <comando>** o **" + afj + "<comando> ayuda** para más información\n<:__:683150505178169345>")
      .addField("Configuración", "```" + cmds.filter(co => co.help.ctg === "Configuración").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)
      .addField("Información", "```" + cmds.filter(co => co.help.ctg === "Información").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)
      .addField("Utilidad", "```" + cmds.filter(co => co.help.ctg === "Utilidad").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)
      .addField("+18", "```Estos comandos se mostrarán en los canales con etiqueta NSFW```", true)
      .addField("Entretenimiento", "```" + cmds.filter(co => co.help.ctg === "Entretenimiento").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)
      .addField("Interactivos", "```" + cmds.filter(co => co.help.ctg === "Interacción").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)
      .addField("Moderación", "```" + cmds.filter(co => co.help.ctg === "Moderación").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)) } 
        
        
      else if(message.channel.nsfw) { message.channel.send(embed.setDescription("Use **" + afj + "ayuda <comando>** o **" + afj + "<comando> ayuda** para más información\n<:__:683150505178169345>")
      .addField("Configuración", "```" + cmds.filter(co => co.help.ctg === "Configuración").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)
      .addField("Información", "```" + cmds.filter(co => co.help.ctg === "Información").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)
      .addField("Utilidad", "```" + cmds.filter(co => co.help.ctg === "Utilidad").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)
      .addField("+ 18", "```" + cmds.filter(co => co.help.ctg === "+18").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)
      .addField("Entretenimiento", "```" + cmds.filter(co => co.help.ctg === "Entretenimiento").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)
      .addField("Interactivos", "```" + cmds.filter(co => co.help.ctg === "Interacción").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)
      .addField("Moderación", "```" + cmds.filter(co => co.help.ctg === "Moderación").sort((a, b) => a.help.nombre).map(co => co.help.nombre).join(", ") +"```", true)) } } }

module.exports.help = { nombre: "ayuda", desc: "Ayuda acerca de los comandos del bot.", apagado: false, args: false, uso: "[nada | comando]", alias: ["help", "cmdhelp"] }
