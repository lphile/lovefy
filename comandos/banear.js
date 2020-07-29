const { MessageEmbed } = require("discord.js"), c = require("/app/config.json")

module.exports = (client, message, args) => { const mb = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || client.users.cache.get(args[0]), r = args.slice(1).join(" ")
  
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
       .setTitle("Carencia de permisos").setDescription("Necesito el permiso de **Banear miembros**")) }
  
    if (!mb) { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
      .setDescription("No he encontrado al miembro mencionado para **banear**")) } 
  
    if (mb.id === client.user.id) { message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
      .setDescription("¿Banearme a mi?, ¿acaso quieres que el universo explote? 🤔")) }
  
    if (mb.roles.highest.comparePositionTo(message.member.roles.highest) > 0) { message.channel.send(new MessageEmbed().setTitle("Carencia de permisos")
        .setDescription("Este miembro tiene la misma o más alta jerarquía que usted").setColor(c.color)) }
  
    else if (!r) { return message.channel.send(new MessageEmbed().setColor(c.color).setAuthor(message.guild.name, message.guild.iconURL())
        .setDescription("Establezca una razón para **banear** a este-a miembro")) }
  
    message.channel.send(new MessageEmbed().setDescription("Logré banear a " + `${mb}` + " a razón de: **" + r + "**").setColor(c.color))

    message.guild.members.ban(mb, { reason: "Por " + r + ", acción tomada por "  + message.member.tag }) }

module.exports.help = { nombre: "banear", desc: "Prohibe la entrada al servidor a un usuario", alias: ["ban", "forbid"], apagado: true, permiso: "BAN_MEMBERS", args: false, 
                       uso: "<id | mención | nombre y etiqueta> <razón>", exm: ["`ban 0123456789876543210`\nBanea a un usuario por medio de su **ID**", 
                                                                                "`ban @Pana_Miguel`\nBanea a un miembro del servidor por medio de su mención"]  }