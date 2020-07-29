const { MessageEmbed, MessageAttachment } = require("discord.js"), c = require("/app/config.json"), Data = require("/app/funciones.js")

module.exports = async (client, message, args) => { const Canvas = require("canvas"), canvas = Canvas.createCanvas(800,360), ctx = canvas.getContext("2d")

const background = await Canvas.loadImage("https://i.imgur.com/0YrfJgx.png")
ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

//Titulo
ctx.font = "70px Arial"
ctx.fillStyle = "#fff"
ctx.textAlign = "center"
ctx.textBaselin = "hanging"
ctx.fillText(`¡Bienvenido ${message.author.username}!`, canvas.width/2, 75)

const y= 100, radio= 85, x=canvas.width/2-radio

//Borde del avatar
ctx.beginPath()
ctx.arc(x+radio, y+radio, radio +5, 0, Math.PI * 2, true)
ctx.fillStyle = "#101010"
ctx.fill()
ctx.stroke()
ctx.closePath()

//Circulo para cortar el avatar
ctx.save()
ctx.beginPath()
ctx.arc(x+radio, y+radio, radio, 0, Math.PI * 2, true)
ctx.closePath()
ctx.clip()

//Avatar
const imagen = await Canvas.loadImage(message.author.displayAvatarURL({dynamic: false, size:256, format:"png"}))
ctx.drawImage(imagen, x, y, radio*2, radio*2)

const attach = new MessageAttachment(canvas.toBuffer(),"bienvenida.png")

message.channel.send(attach)
                                                   
}; module.exports.help = { nombre: "test", descripcion: "La descripción", apagado: false, args: false, uso: "<nada | miembro>", alias: ["sus-apodos"] }
