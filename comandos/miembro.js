module.exports = {
    nombre: 'miembro',
    categoría: 'Información',
    desc: 'Muestra información de un miembro especifico',
    arg: '[miembro]',
    apodos: ['userinfo', 'member', 'user'],
    permisoB: 'EMBED_LINKS',
    estado: true,
    run: async(client, message, param) => {

        let Canvas = client.canvas

        /*var insignias = { 'DISCORD_EMPLOYEE': '<:empleado:757098912590069822>', 'DISCORD_PARTNER': '<:propietarioasociado:757335285335064677>', 'HYPESQUAD_EVENTS': '<:eventoshypesquad:757380504940052480>',
        'HOUSE_BRAVERY': '<:braveryhypesquad:757098908408086559>', 'HOUSE_BRILLIANCE': '<:brilliancehypesquad:757098912195543060>', 'HOUSE_BALANCE': '<:balancehypesquad:757098910605901904>', 
        'BUGHUNTER_LEVEL_2': '<:cazaerroresn2:757397630719492116>', 'BUGHUNTER_LEVEL_1': '<:cazaerrores:757098913260896297>', 'SYSTEM': 'System', 'VERIFIED_DEVELOPER': '<:desarrolladorinicial:757098908676522065>', 
        'EARLY_SUPPORTER': '<:partidarioinicial:757381297617502208>', 'TEAM_USER': 'Team User' }*/
        
        let miembro = message.mentions.members.first() || message.guild.members.resolve(param[0]) || message.guild.members.cache.find(m => m.user.username === param[0] || m.user.tag === param[0]) || message.member,
        rank = {exp: 69, level: 110} 

//como ejemplo, agregé 2 fuentes custom
Canvas.registerFont("./Uni Sans Heavy.otf", { family: "Unisans"})
const canvas = Canvas.createCanvas(370,110)
const ctx = canvas.getContext('2d')

//Fondo 
//ctx.fillStyle = "#000"
//ctx.fillRect(0,0,canvas.width,canvas.height)

const fondo = await Canvas.loadImage('./fondo.jpg')
ctx.drawImage(fondo,0,0,canvas.width,canvas.height)

//Rectangulo de la izquierda 
ctx.globalAlpha = 0.9
ctx.fillStyle = "#fff"
ctx.fillRect(82,9,280,91)
ctx.globalAlpha = 1

//Borde del avatar
ctx.fillStyle = "#756e6d"
ctx.lineWidth = 0.5
ctx.strokeRect(42,16,78,78)

//Avatar
//discord.js v11:
//const avatar = await Canvas.loadImage(miembro.displayAvatarURL)
//discord.js v12: (es importante que no sea dinámico)
const avatar = await Canvas.loadImage(miembro.user.displayAvatarURL({dynamic:false,size:256,format:"png"}))
ctx.drawImage(avatar, 44, 18, 74, 74);

//Borde de la barra de exp
ctx.fillStyle = "#756e6d"
ctx.lineWidth = 0.2
ctx.strokeRect(143,32,212,15)

ctx.lineWidth = 1

//Fondo de la barra de exp
ctx.fillStyle = "#fff"
ctx.fillRect(145,34,208,11)

//Barra de exp
ctx.fillStyle = "#94a6e3"
let x = rank.exp
ctx.fillRect(145,34,Math.round((x*208/100)),11)

//EXP encima de la barra de EXP
ctx.font = "10px Unisans"
ctx.fillStyle = "#606060"
ctx.textAlign='center'
ctx.fillText(`XP: ${rank.exp} / ${100}`, 250, 43)

//Linea divisora
ctx.fillStyle = "#000"
ctx.lineWidth = 0.5
ctx.moveTo(218,52)
ctx.lineTo(218,96)
ctx.stroke()

ctx.lineWidth = 1

//Tag del usuario
ctx.font = "13px Unisans"
ctx.fillStyle = "#606060"
ctx.textAlign='left'
ctx.fillText(miembro.tag, 143, 25);

//"Server Rank"
ctx.font = "13px Unisans"
ctx.fillStyle = "#606060"
ctx.textAlign='left'
ctx.fillText("Server Rank:", 227, 69)//nice

//El rango
ctx.font = "13px Unisans"
ctx.fillStyle = "#606060"
ctx.textAlign='right'
ctx.fillText("# 1", 354, 69)//nice

//"Server Exp"
ctx.font = "13px Unisans"
ctx.fillStyle = "#606060"
ctx.textAlign='left'
ctx.fillText("Server Exp:", 227, 87)

//El Exp
ctx.font = "13px Unisans"
ctx.fillStyle = "#606060"
ctx.textAlign='right'
ctx.fillText(rank.exp, 354, 87)

//"Level"
ctx.font = "17px Unisans"
ctx.fillStyle = "#606060"
ctx.textAlign='left'
ctx.fillText("LEVEL", 155, 66)

//El nivel actual
ctx.font = "bold 35px Unisans" 
ctx.fillStyle = "#606060"
ctx.textAlign='center'
ctx.fillText(rank.level, 179, 94)  

//en discord.js 11 se llama Attachment
let attachment = new client.discord.MessageAttachment(canvas.toBuffer(),"profile.png")
message.channel.send(attachment)
        
        
        /*,
        embed = client.embed({ fields: [{ name: 'Información de usuario', value: `a` }, { name: 'Información de usuario', value: `a` }]  }, miembro.user)

        message.channel.send(((miembro.user.bot) ? ((miembro.user.flags.has('VERIFIED_BOT') ? '<:botverificado:757386143351439551>' : '<:bot:757386143460229221>')) : miembro.user.flags.toArray().map(e => insignias[e]).join(' ')), embed)*/

    }
}