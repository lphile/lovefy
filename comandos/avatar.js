const { MessageEmbed } = require("discord.js"), c = require("/app/config.json");

module.exports = (client, message, args) => { let miem = message.mentions.members.first()||message.guild.members.cache.get(args[0])||message.guild.members.cache.find(n=> n.user.username === args[0])

  if(["servidor", "server", "icon"].includes(args[0])) { message.channel.send(new MessageEmbed().setTitle(message.guild.name)
      .setDescription("[webp]("+`${message.guild.iconURL({ format: 'webp', size: 1024 })}`+") [png]"+`${message.guild.iconURL({ format: 'png', size: 1024 })}`+") [gif]"
      +`${message.guild.iconURL({ format: 'gif', size: 1024 })})`).setImage(message.guild.iconURL({ format: 'webp', dynamic: true, size: 1024 })).setColor(c.color)) }
  
  else if(["bot", "robot", "coopy"].includes(args[0])) { message.channel.send(new MessageEmbed().setTitle(client.user.tag)
      .setDescription("[webp]("+ `${client.user.displayAvatarURL({ format: 'webp', size: 1024 })}`+") [png]("+`${client.user.displayAvatarURL({ format: 'png', size: 1024 })}`+") [gif]("
      +`${client.user.displayAvatarURL({ format: 'gif' })})`).setImage(client.user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 })).setColor(c.color)) } 
  
  else if (!miem) { miem = message.author;  message.channel.send(new MessageEmbed().setTitle(miem.tag).setDescription("[webp]("+`${miem.displayAvatarURL({ format: 'webp', size: 1024 })}`+") [png]("
      +`${miem.displayAvatarURL({ format: 'png', size: 1024 })}`+") [gif]("+`${miem.displayAvatarURL({ format: 'gif', size: 1024 })})`)
      .setImage(miem.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 })).setColor(c.color)) }
                                             
  else { message.channel.send(new MessageEmbed().setTitle(miem.user.tag).setDescription("[webp]("+`${miem.user.displayAvatarURL({ format: 'webp', size: 1024 })}`+") [png]("
      +`${miem.user.displayAvatarURL({ format: 'png', size: 1024 })}`+") [gif]("+`${miem.user.displayAvatarURL({ format: 'gif', size: 1024 })})`)
      .setImage(miem.user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 })).setColor(c.color)) }}

module.exports.help = { nombre: "avatar", desc: "Muestra el avatar del miembro mencionado", apagado: false, args: false, uso: "<miembro | servidor | bot>", alias: ["foto", "ava", "photo"], 
                        exm: ["`avatar`\nMuestra **tu avatar** al no mencionar nada", "`avatar @Luigi`\nMuestra el avatar del miembro **Luigi**",
                              "`avatar servidor`\nMuestra el ícono del **servidor**", "`avatar bot`\nMuestra el avatar del **bot**, esto también sucede si mencionas al bot en el comando"], 
                       ctg: "Información" }