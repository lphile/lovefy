const { MessageEmbed } = require("discord.js"), { color }= require("/app/config.json"), cheerio = require('cheerio'), request = require('request');

module.exports = async (client, message, args) => { if (!args[0]) return message.channel.send('Dame un resultado de búsqueda'); image(message)

async function image(message) { var opc = { url: "http://results.dogpile.com/serp?qc=images&q=" + args.join(" "), method: "GET", headers: { "Accept": "text/html", "User-Agent": "Chrome" } }
    
request(opc, async function(error, response, responseBody) { if (error) { return } $ = cheerio.load(responseBody); var enlace = $(".image a.link"),
    urls = new Array(enlace.length).fill(0).map((v, i) => enlace.eq(i).attr("href"))
        
if (!urls.length) { message.channel.send("No se ha encontrado nada") }
                                                            
        const i = 0, max = urls.length - 1, embed = new MessageEmbed().setTitle("Búsqueda de imagen sobre: " + args.join(" ")).setImage(urls[i]).setColor(color)
        .setDescription("Usa las reacciones para poder moverte de una imagen a otra").setFooter(`${i + 1}/${max + 1}`), fil = (reaction, user) => 
        { ['◀️', '▶️', '⏹️'].includes(reaction.emoji.name) && user.id === message.author.id }, msg = await message.channel.send(embed); await msg.react('◀️'); await msg.react('⏹️'); 
        await msg.react('▶️'); const col = msg.createReactionCollector(fil, { idle: 20000 })
        
        col.on('collect', async (reaction, user) => { 
          
        if (reaction.emoji.name === '▶️') { await reaction.users.remove(user.id); if (max !== i){ i++; embed.setImage(urls[i]); embed.setFooter(`${i + 1}/${max + 1}`); await msg.edit(embed) } }
        
        if (reaction.emoji.name === '◀️') { await reaction.users.remove(user.id); if (i !== 0) { i--; embed.setImage(urls[i]); embed.setFooter(`${i + 1}/${max + 1}`); await msg.edit(embed) } }
            
        if (reaction.emoji.name === '⏹️') { col.stop() } })
        
        col.on('end', collected => msg.reactions.removeAll()) }) } }

module.exports.help = { nombre: "img", desc: "Haz una búsqueda de la imagen que quieras", apagado: false, args: false, uso: "<búsqueda>", alias: ["imgsearch", "buscarimg"], 
                       exm: ["`img Planeta Tierra`\nBusca imágenes relacionadas con el planeta tierra"], ctg: "Entretenimiento"  }