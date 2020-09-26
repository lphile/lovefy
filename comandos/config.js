module.exports = {
    nombre: 'config',
    categoría: 'Administración',
    desc: 'Gestiona distintas configuraciones del servidor',
    arg: '<opción> [nuevo valor]',
    apodos: ['set', 'cfg', 'setup'],
    permisoB: 'EMBED_LINKS',
    estado: false,
    permisoU: 'MANAGE_GUILD',
    run: async(client, message, param) => {
        
        switch(param[0]) { 
            case 'prefijo': { 
                if(!param[1]) { message.channel.send(client.embed({ description: 'No ha especificado mi nuevo prefijo en este servidor' }, message.author)) } 
                else { 
                    switch(param[1]) {
                        case 'defecto': case 'default': { config.set(`prefijo.${message.guild.id}`, 'v!') 
                        message.channel.send(client.embed({ description: 'Mi prefijo en este servidor ha sido establecido por defecto, es decir **v!**' }, message.author)) } 
                        break;
                
                        default: { config.set(`prefijo.${message.guild.id}`, param[1]) 
                        message.channel.send(client.embed({ description: `Mi prefijo en este servidor ha sido establecido a: **${param[1]}**`}, message.author)) } 
                    } 
                }
            }
            break;

            case 'registro': { let registros = ['mensaje-eliminado', 'mensaje-actualizado', 'miembro-añadido', 'miembro-removido'], can = message.mentions.channels.first() || 
            message.guild.channels.resolve(param[2]) || message.guild.channels.cache.find(ch => ch.name === param[2]) || message.channel 
                switch(true) {
                    case registros.includes(param[1]): { config.set(`registro.${message.guild.id}.${param[1]}`, can.id)
                    message.channel.send(client.embed({ title: param[1], description: `Se ha establecido los registros de ${param[1]} para el canal ${can}` }, message.author)) }
                    break;

                    default: { message.channel.send(client.embed({ description: `No ha establecido un registro correcto, la lista es \`${registros.join('`, `')}\`` }, message.author)) }
                } 
            }
            break;

            case 'sugerencia': { 
                let can = message.mentions.channels.first() || message.guild.channels.resolve(param[2]) || message.guild.channels.cache.find(ch => ch.name === param[2]) || message.channel,
                emoji = message.guild.emojis.cache.find(e => e.name === param[2] || e.id === param[2])
                if(!param[1]) { message.channel.send(client.embed({ description: 'No ha especificado un objeto válido, asegúrese de que sea referente al servidor' }, message.author)) } 
                else { 
                    switch(param[1]) {
                        case 'canal': case 'channel': { config.set(`sugerencia.${message.guild.id}.can`, can.id) 
                        message.channel.send(client.embed({ description: `El canal de sugerencias en este servidor ha sido establecido a ${can}` }, message.author)) } 
                        break;
                        
                        case 'emosí': case 'emoyes': { config.set(`sugerencia.${message.guild.id}.yes`, emoji.id) 
                        message.channel.send(client.embed({ description: `La reacción de aceptación de sugerencias en este servidor ha sido establecido a ${emoji}` }, message.author)) } 
                        break;

                        case 'emono': case 'emonop': { config.set(`sugerencia.${message.guild.id}.nop`, emoji.id) 
                        message.channel.send(client.embed({ description: `La reacción de rechazo de sugerencias en este servidor ha sido establecido a ${emoji}` }, message.author)) } 
                        break;
                    } 
                }
            }
            break;

            case 'destacado': { 
                let can = message.mentions.channels.first() || message.guild.channels.resolve(param[2]) || message.guild.channels.cache.find(ch => ch.name === param[2]) || message.channel

                if(!param[1]) { message.channel.send(client.embed({ description: 'No ha especificado un objeto válido, asegúrese de que sea referente al servidor' }, message.author)) } 
                else { 
                    switch(param[1]) {
                        case 'canal': case 'channel': { config.set(`destacados.${message.guild.id}.can`, can.id) 
                        message.channel.send(client.embed({ description: `El canal de destacados en este servidor ha sido establecido a ${can}` }, message.author)) } 
                        break;
                        
                        case 'conteo': case 'count': { config.set(`destacados.${message.guild.id}.conteo`, parseInt(param[2])) 
                        if(isNaN(param[2])) { return message.channel.send(client.embed({ description: 'El conteo debe ser de caracter numérico' })) }
                        message.channel.send(client.embed({ description: `La cantidad de reacciones para el envío de destacados ha sido establecido a ${param[2]}` }, message.author)) } 
                        break;
                    } 
                }
            }
            break;

            case 'sorteo': { 
                let can = message.mentions.channels.first() || message.guild.channels.resolvet(param[2]) || message.guild.channels.cache.find(ch => ch.name === param[2]) || message.channel,
                emoji = message.guild.emojis.cache.find(e => e.name === param[2] || e.id === param[2])

                if(!param[1]) { message.channel.send(client.embed({ description: 'No ha especificado un objeto válido, asegúrese de que sea referente al servidor' }, message.author)) } 
                else { 
                    switch(param[1]) {
                        case 'canal': case 'channel': { config.set(`sorteo.${message.guild.id}.can`, can.id) 
                        message.channel.send(client.embed({ description: `El canal de destacados en este servidor ha sido establecido a ${can}` }, message.author)) } 
                        break;
                        
                        case 'reacción': case 'reaction': { config.set(`sorteo.${message.guild.id}.emoji`, emoji.id) 
                        message.channel.send(client.embed({ description: `La reacción de los sorteos en este servidor ha sido establecido a ${emoji}` }, message.author)) } 
                        break;
                    } 
                }
            }
            break;
        } 
    }
}