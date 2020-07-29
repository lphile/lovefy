const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { crearDB } = require("megadb"), cfg = new crearDB("configs"), sm = require('string-similarity'), fs = require("fs"),
      blc = new crearDB("blocks")

module.exports = async (client, message) => { let cu = client.channels.cache.get("734952104900296825"), afj = await cfg.get("afijo."+message.guild.id), lvf = new RegExp(`^<@!?${client.user.id}>( |)$`)
  
if(message.channel.type === "dm") { return }

  blc.find("canales", (v) => v.includes(message.channel.id)).then(async function (ca) { if(ca == undefined) {

  if(!cfg.has("afijo."+message.guild.id)) { cfg.set("afijo."+message.guild.id, "v!") } else { afj }

  if (message.content.match(lvf)) { message.channel.send(new MessageEmbed().setFooter(client.user.username, client.user.displayAvatarURL()).setTimestamp().setColor(c.color)
                                        .setDescription("Al usar **"+afj+"ayuda** obtendrás información sobre mis comandos disponibles").setTitle("Afijo en este servidor: " + afj)) }
                                             
  if (message.author.bot) { return } if (!message.content.startsWith(afj)) { return }

  const args = message.content.slice(afj.length).trim().split(/ +/gm), command = args.shift().toLowerCase(), cmd = client.comandos.get(command) ||
        client.comandos.find(cmd => cmd.help && cmd.help.alias && cmd.help.alias.includes(command)), comandos = fs.readdirSync('/app/comandos/'), match = await sm.findBestMatch(command, comandos)
  
  if(!cmd) { message.channel.send(new MessageEmbed().setTitle("Comando no encontrado").setColor(c.color).setFooter(client.user.username, client.user.displayAvatarURL()).setTimestamp()
              .setDescription("**" + afj + command + "** no existe, intente ejecutar en su lugar: **" + afj + match.bestMatch.target.replace('.js', '') + "**")) }
                                             
  else if (cmd.help && cmd.help.apagado) 
  { message.channel.send(new MessageEmbed().setTitle("Apagado").setFooter(client.user.username, client.user.displayAvatarURL()).setTimestamp().setColor(c.color)
                         .setDescription("Este comando se encuentra apagado por motivos de actualización")) }
                                               
  else if(!message.member.permissions.has(cmd.help.permiso)) { 
  message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL()).setTitle("Permisos para " + command)
  .setDescription("No cuenta con el permiso suficiente, necesita el permiso **" + c.permisos[cmd.help.permiso] + "** para ejecutar este comando.")) } 

  else if(["help", "ayuda", "info"].includes(args[0]) && cmd.help) { 
    
    if(cmd.help.exm) { message.channel.send(new MessageEmbed().setTitle(afj + cmd.help.nombre).setDescription("```" + cmd.help.desc + "```").setColor(c.color)
    .addField("Ejemplos", cmd.help.exm.join("\n\n"), true).addField("Argumentación", "`" + afj + command + " " + cmd.help.uso + "`", true).addField("Apodos", cmd.help.alias.join(", "), true)) } 
  
    else { message.channel.send(new MessageEmbed().setTitle(afj + cmd.help.nombre).setDescription("```" + cmd.help.desc + "```").setColor(c.color)
                  .addField("Argumentación", "`" + afj + command + " " + cmd.help.uso + "`", true).addField("Apodos", cmd.help.alias.join(", "), true)) } }
  
  else try { cmd(client, message, args) } catch (err) { console.log(err) } finally { cu.send(`${message.author} usó **${command}** en ${message.guild.name} (${message.guild.memberCount})`) } } 
  else { return } }) } 