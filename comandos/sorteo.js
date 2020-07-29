const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { crearDB } = require("megadb"), cfg = new crearDB("configs"), ms = require("ms"), moment = require("moment");
moment.locale("es")

module.exports = async(client, message, args) => { const embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL())
.setFooter(`termina ${moment(+new Date() + ms(args[1])).fromNow()}`).setColor(c.color), ganad = parseInt(args[0]), sorteo = args[2] ? args.slice(2).join(" ") : "misterio"
                                                 
switch(ganad) {
  case 1: message.channel.send(embed.setDescription(`${message.author} creó un sorteo de **${sorteo}** para **1** ganador que dura ${moment(+new Date() + ms(args[1])).fromNow()}`));
  
  case 1 < ganad: message.channel.send(embed.setDescription(`${message.author} creó un sorteo de **${sorteo}** para **${ganad}** ganadores que dura ${moment(+new Date() + ms(args[1])).fromNow()}`));
    
  default: return;

}






}

module.exports.help = { nombre: "sorteo", descripcion: "La descripción", apagado: false, args: false, uso: "<nada | miembro>", alias: ["giveaway", "gaway"] }