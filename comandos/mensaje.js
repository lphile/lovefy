module.exports = {
    nombre: 'mensaje',
    categoría: 'Utilidad',
    desc: 'Interactúa con los atajos de mensaje',
    arg: '<repetir <mensaje> | actualizado [canal] | eliminado [canal]>',
    apodos: ['message', 'msg', 'msj'],
    permisoB: 'EMBED_LINKS',
    estado: true,
    run: async(client, message, param) => {
        switch(param[0]) {
            case 'repeat': case 'repetir': {

                if(param.slice(1).includes('-e')) {

                   return message.channel.send(client.embed({ description: param.slice(1).join(' ').replace('-e', '') }, message.author))

                }
                
                else { message.channel.send(param.slice(1).join(' '), { disableMentions: 'all' }) }

            }
            break;
            
            case 'updated': case 'actualizado': { let can = message.mentions.channels.first() || message.guild.channels.resolve(param[1]) || message.channel, edit = client.mensajes.get('actualizados' + can.id)
                if(!edit) { message.channel.send(client.embed({ description: `No hay mensajes actualizados recientemente en ${can} 🤷‍♂️` }, message.author)) }
                else { let autor = client.users.resolve(edit.autor)
                    message.channel.send(client.embed({ footer: { text: autor.tag, url: autor.displayAvatarURL({ dynamic: true }) }, fields: [{ name: 'Antes', value: edit.antes, inline: true },
                    { name: 'Después', value: edit.después, inline: true }], timestamp: +new Date() }, message.author)) }
            }
            break;

            case 'deleted': case 'eliminado': { let can = message.mentions.channels.first() || message.guild.channels.resolve(param[1]) || message.channel, del = client.mensajes.get('eliminados' + can.id)
                if(!del) { message.channel.send(client.embed({ description: `No hay mensajes eliminados recientemente en ${can} 🤷‍♂️` }, message.author)) }
                else { let autor = client.users.resolve(del.autor)
                    message.channel.send(client.embed({ footer: { text: autor.tag, url: autor.displayAvatarURL({ dynamic: true }) }, description: del.contenido, timestamp: +new Date() }, message.author)) }
            }
            break;
        }
    }
}