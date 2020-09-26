module.exports = {
    nombre: 'infracción',
    categoría: 'Moderación',
    desc: 'Gestiona las infracciones de un miembro dentro del servidor',
    arg: '<miembro> [opción] [nuevo valor]',
    apodos: ['inf', 'infr', 'infraction'],
    estado: true,
    permisoU: 'MANAGE_GUILD',
    run: async(client, message, param) => {
        
        let inf = client.infrs, miembro = message.mentions.members.first() || message.guild.members.resolve(param[1]) || message.guild.members.cache.find(m => m.user.tag === param[1])
        
        switch(param[0]) {

            case 'archive': case 'archivar': case 'all': {
                
                inf.filter(false, (n) => (n.server === message.guild.id))
                .then(async id => { let lista = []
                    
                    for(var clave in id) { let type = id[clave].infr, mod = id[clave].mod, user = id[clave].user, reason = id[clave].reason, activity = id[clave].activity
                        lista.push(`[${clave}] - ${client.moment(activity).fromNow()} - ${type} - ${message.guild.members.resolve(mod).displayName}#${client.users.resolve(mod).discriminator} a ${message.guild.members.resolve(user).displayName}#${client.users.resolve(user).discriminator} - ${reason}`)
                    }
                    
                    await client.fisy.writeFileSync(`infracciones/${message.guild.id}.txt`, `[ id ] -ㅤ actividadㅤ -ㅤ tipoㅤ -ㅤ mod a miembroㅤ -ㅤ ㅤ razónㅤ ㅤ \n${lista.join('\n')}`)
                    message.channel.send(new client.discord.MessageAttachment(client.fisy.createReadStream(`infracciones/${message.guild.id}.txt`)))
                    
                })

            }
            break;
            
            case 'search': case 'buscar': case 'find': {

                if(miembro) {

                    inf.filter(false, (n) => (n.user === miembro.id) && (n.server === message.guild.id)).then(id => { 

                        if(Object.keys(id).length <= 0) { return message.channel.send(client.embed({ description: `El miembro ${miembro} no tiene infracciones que mostrar` }, miembro.user)) }

                        let lista = client.obtLista(id)
                        
                        lista.map((inf, índice) => lista[índice] = `[${inf[0]}] - ${client.moment(inf[1]).fromNow()} - ${inf[2]} - ${client.users.resolve(inf[3]).tag} - ${(inf[5].length > 20) ? `${inf[5].slice(0, 20)}...` : inf[5]}`)

                        let páginas = []

                        while(lista.length > 0) { páginas.push(lista.splice(0, 9)) }

                        if(!param[2]) { message.channel.send(client.embed({ title: `Infracciones de ${miembro.user.tag} (\`pág 1 de ${páginas.length}\`)`, 
                        description: `\`\`\`ini\n[id] -  actividad  - tipo -ㅤ ㅤ modㅤ ㅤ -ㅤㅤ  ㅤ razónㅤ ㅤ ㅤ \n\n${páginas[0].join('\n')}\n\`\`\`` }, miembro.user)) }

                        else if(isNaN(param[2])) { message.channel.send(client.embed({ description: 'Debe de proporcionar un número como índice de página a ver' }, miembro.user)) }

                        let selección = parseInt(param[2])

                        if(selección <= 0 || selección > páginas.length) { message.channel.send(client.embed({ description: `Debe de proporcionar un número menor a \`${páginas.length}\` como índice de página a ver` }, message.author)) }

                        else if(param[2]) { message.channel.send(client.embed({ title: `Infracciones de ${message.guild.name} (\`pág ${selección} de ${páginas.length}\`)`, 
                        description: `\`\`\`ini\n[id] -  actividad  - tipo -ㅤ ㅤ modㅤ ㅤ -ㅤㅤ  ㅤ razónㅤ ㅤ ㅤ \n\n${páginas[selección - 1].join('\n')}\n\`\`\`` }, miembro.user)) }

                    })
                    
                }

                else {

                    inf.filter(false, (n) => (n.server === message.guild.id)).then(id => {

                        if(Object.keys(id).length <= 0) { return message.channel.send(client.embed({ description: `No hay infracciones en el servidor que mostrar` }, message.author)) }

                        let lista = client.obtLista(id)
                        
                        lista.map((inf, índice) => lista[índice] = `[${inf[0]}] - ${client.moment(inf[1]).fromNow()} - ${inf[2]} - ${message.guild.members.resolve(inf[4]).displayName} a ${message.guild.members.resolve(inf[3]).displayName} - ${(inf[5].length > 20) ? `${inf[5].slice(0, 20)}...` : inf[5]}`)

                        let páginas = []

                        while(lista.length > 0) { páginas.push(lista.splice(0, 9)) }

                        if(!param[1]) { message.channel.send(client.embed({ title: `Infracciones de ${message.guild.name} (\`pág 1 de ${páginas.length}\`)`, 
                        description: `\`\`\`ini\n[id] -  actividad  - tipo -ㅤ mod a miembro  -ㅤㅤ  ㅤ razónㅤ ㅤ ㅤ \n\n${páginas[0].join('\n')}\n\`\`\`` }, message.author)) }

                        else if(isNaN(param[1])) { message.channel.send(client.embed({ description: 'Debe de proporcionar un número como índice de página a ver' }, message.author)) }

                        let selección = parseInt(param[1])

                        if(selección <= 0 || selección > páginas.length) { message.channel.send(client.embed({ description: `Debe de proporcionar un número menor a \`${páginas.length}\` como índice de página a ver` }, message.author)) }

                        else if(param[1]) { message.channel.send(client.embed({ title: `Infracciones de ${message.guild.name} (\`pág ${selección} de ${páginas.length}\`)`, 
                        description: `\`\`\`ini\n[id] -  actividad  - tipo -ㅤ mod a miembro  -ㅤㅤ  ㅤ razónㅤ ㅤ ㅤ \n\n${páginas[selección - 1].join('\n')}\n\`\`\`` }, message.author)) }

                    })

                }
            }
            break;
            
            case 'info': case 'view': case 'ver': { let id = await inf.get(param[1]), miembro = message.guild.members.cache

                if(!id || id.server != message.guild.id) { return message.channel.send(client.embed({ description: 'Proporcione una **id** válida de infracción, referente al servidor, puede comprobar mediante el comando de búsqueda de infracciones' }, message.author)) }

                else { return message.channel.send(client.embed({ title: id.infr, fields: [{ name: 'Miembro', value: `${miembro.get(id.user)} - ${miembro.get(id.user).user.tag}`, inline: true }, { name: 'Moderador', value: `${miembro.get(id.mod)} - ${miembro.get(id.mod).user.tag}`, inline: true },
                { name: 'Actividad', value: client.moment(id.activity).fromNow(), inline: true }, { name: 'Razón', value: id.reason.slice(0, 1024), inline: true } ] }, miembro.get(id.user).user)) }

            }
            break;

            case 'delete': case 'eliminar': case 'erase': { let id = await inf.get(param[1]), miembro = message.guild.members.cache

                if(!id || id.server != message.guild.id) { return message.channel.send(client.embed({ description: 'Proporcione una **id** válida de infracción, referente al servidor, puede comprobar mediante el comando de búsqueda de infracciones' }, message.author)) }

                else {
                    inf.delete(param[1])
                    return message.channel.send(client.embed({ description: `La infracción \`#${param[1]}\` ha sido eliminada correctamente` }, miembro.get(id.user).user))
                }

            }
            break;

            case 'reason': case 'razón': case 'edit': { let id = await inf.get(param[1]), nrazón = param[2] ? param.slice(2).join(' ') : 'sin razón', miembro = message.guild.members.cache

                if(!id || id.server != message.guild.id) { return message.channel.send(client.embed({ description: 'Proporcione una **id** válida de infracción, referente al servidor, puede comprobar mediante el comando de búsqueda de infracciones' }, message.author)) }

                else {
                    inf.set(`${param[1]}.reason`, nrazón)
                    return message.channel.send(client.embed({ description: `La razón de la infracción \`#${param[1]}\` ha sido cambiada a \`${nrazón}\`` }, miembro.get(id.user).user))
                }

            }
            break;

        }
    }
}