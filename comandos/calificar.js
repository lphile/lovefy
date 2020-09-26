module.exports = {
    nombre: 'calificar',
    categoría: 'Administración',
    desc: 'Califica las sugerencias del servidor',
    apodos: ['rate', 'decidir'],
    arg: '<aceptar | rechazar | considerar | invalidar> <id del mensaje> [razón opcional]',
    permisoB: 'EMBED_LINKS',
    estado: true,
    run: async(client, message, param, config, idioma) => { 
        
        let color, estado, acción, canal = (config.sugestiones ? config.sugestiones.canal : false) ? await client.channels.resolve(config.sugestiones.canal) : false

        switch(param[0]) {

            case 'aceptar': case 'accept': { color = 'GREEN', estado = idioma.calificar.aceptar.estado, idioma.calificar.aceptar.estado = 'aceptó' }
            break;

            case 'rechazar': case 'deny': { color = 'RED', estado = idioma.calificar.rechazar.estado, acción = idioma.calificar.rechazar.acción }
            break;

            case 'considerar': case 'consider': { color = 'ORANGE', estado = idioma.calificar.considerar.estado, acción = idioma.calificar.considerar.acción }
            break;

            case 'invalidar': case 'anull': { color = 'GRAY', estado = idioma.calificar.invalidar.estado, acción = idioma.calificar.invalidar.acción }
            break;

            default: { return message.channel.send(client.embed({ fields: [{ name: idioma.ayuda.argumento, value: `\`${module.exports.nombre} ${module.exports.arg}\`` }] }, message.author)) }

        }

        if(!param[1]) { return message.channel.send(client.embed({ description: idioma.calificar.id_inválida }, message.author)) }

        let embed = client.embed({}, message.author), razón = param[2] ? embed.addField(idioma.calificar.respuesta, param.slice(2).join(' ')) : undefined, mensaje = await canal.messages.fetch(param[1])
        .catch((err) => { return message.channel.send(client.embed({ description: idioma.calificar.id_inválida }, message.author)) }), 
        imagen = (mensaje.attachments.size > 0) ? mensaje.attachments.first().proxyURL : undefined, sugerencia = await mensaje.embeds[0], autor = await client.users.cache.find(u => u.tag === sugerencia.author.name)

        mensaje.edit(embed.setTitle(idioma.calificar.sugerencia_estado.replace('{estado}', estado)).setDescription(sugerencia.description).setImage(imagen).setColor(color))

        autor.send(client.embed({ title: idioma.calificar.sugerencia_estado.replace('{estado}', estado), description: `${message.author} ${acción} ${idioma.calificar.sugerencia_calificación}(${mensaje.url})` }, client.user))

        message.channel.send(client.embed({ description: `${idioma.calificar.sugerencia_confirmación.replace('{param[0]}', param).replace('{estado}', estado)}(${mensaje.url})` }, message.author))

    }
}