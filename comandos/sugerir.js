module.exports = {
    nombre: 'sugerir',
    categoría: 'Utilidad',
    desc: 'Envía sugstiones para el mejoramiento comunitario',
    apodos: ['suggest'],
    permisoB: 'EMBED_LINKS',
    estado: true,
    run: async(client, message, param, config) => {

        let canal = (config.sugestiones ? config.sugestiones.canal : false) ? await client.channels.resolve(config.sugestiones.canal) : false, 
        emoyes = ((config.sugestiones && config.sugestiones.aceptar) ? config.sugestiones.aceptar.reaccion : false) ? await config.sugestiones.aceptar.reaccion : '✅',
        emoybe = ((config.sugestiones && config.sugestiones.considerar) ? config.sugestiones.considerar.reaccion : false) ? await config.sugestiones.considerar.reaccion : '↖',
        emonop = ((config.sugestiones && config.sugestiones.rechazar) ? config.sugestiones.rechazar.reaccion : false) ? await config.sugestiones.rechazar.reaccion : '❎'
    
        if(!param[0]) { message.channel.send(client.embed({ description: 'Debe de especificar la sugerencia a enviar 🤔' }, message.author)) }

        else if(!canal) { message.channel.send(client.embed({ description: 'No hay un canal de sugerencias registrado en este servidor' }, message.author)) }

        else { message.channel.send(client.embed({ description: 'Tu sugerencia se ha enviado correctamente al canal de sugerencias' }, message.author))

            canal.send(client.embed({ title: 'Sugerencia en proceso', description: param.slice(0).join(' '), image: { url: (message.attachments.size > 0) ? message.attachments.first().proxyURL : undefined }, timestamp: new Date() }, message.author))
            .then(async(msg) => { await msg.react(emoyes), await msg.react(emoybe), await msg.react(emonop) })

        }
    }
}