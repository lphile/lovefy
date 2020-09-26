module.exports = {
    nombre: 'silenciar',
    categoría: 'Moderación',
    desc: 'Silencia a un miembro',
    arg: '<miembro> [tiempo opcional] [razón opcional] | lista',
    apodos: ['mute', 'unvoice', 'callar'],
    permisoB: 'MANAGE_CHANNELS' || 'MANAGE_ROLES',
    permisoU: 'MANAGE_MESSAGES',
    estado: true,
    run: async(client, message, param, config) => { 
        
        let inf = client.infrs, rol = await config.infracciones.rol

        switch(param[0]) {

            case 'lista': case 'list': case 'roll': {

                if(!rol || message.guild.members.cache.filter(m => m.roles.cache.has(rol)).size < 1) { return message.channel.send(client.embed({ description: 'No hay vista previa disponible de la lista de silenciados' }, message.author)) }

                message.channel.send(client.embed({ description: `${message.guild.members.cache.filter(m => m.roles.cache.has(rol)).map(me => `${me}`).join(', ')}` }, message.author))

            }
            break;

            default: {
                
                let miembro = message.mentions.members.first() || message.guild.members.resolve(param[0]) || message.guild.members.cache.find(m => m.user.tag === param[0]),
                tiempo = param[1], razón = param[2] ? param.slice(2).join(' ') : 'sin razón'

                if(!rol) { return message.channel.send(client.embed({ description: `No hay un rol de infracción establecido en el servidor` }, message.author)) }

                else if(!miembro || (miembro.id === message.author.id) || (miembro.id === client.user.id)) { return message.channel.send(client.embed({ description: 'No ha especificado el miembro a silenciar o el miembro a silenciar es incorrecto' }, message.author)) }

                else if(miembro.permissions.has('MANAGE_CHANNELS' || 'MANAGE_ROLES' || ['MANAGE_CHANNELS', 'MANAGE_ROLES'])) { return message.channel.send(client.embed({ description: 'No puedo silenciar a un miembro que puede evadir la acción' }, message.author)) }

                else if(miembro.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) { return message.channel.send(client.embed({ description: 'No puedes silenciar a un miembro que tenga la misma o alta jerarquía que yo' }, message.author)) }

                else if(miembro.roles.highest.comparePositionTo(message.member.roles.highest) >= 0) { return message.channel.send(client.embed({ description: 'No puedes silenciar a un miembro que tenga la misma o alta jerarquía que usted' }, message.author)) }

                else if(message.guild.roles.resolve(rol).comparePositionTo(message.guild.me.roles.highest) > 0) { return message.channel.send(client.embed({ description: 'El rol establecido para silenciar no puede ser [gestionado](https://support.discord.com/hc/es/articles/214836687-Gesti%C3%B3n-de-roles-para-novatos)' }, message.author)) }

                else {

                    if(client.ms(tiempo)) {
                        
                        message.channel.send(client.embed({ description: `${miembro} (\`${miembro.id}\`) fue silenciado ${tiempo} (\`${razón}\`)` }, message.author))

                        miembro.roles.add(rol)

                        setTimeout(function() { miembro.roles.remove(rol)

                            message.channel.send(`${miembro}`, client.embed({ description: '¡Ya puedes hablar de nuevo!' }, miembro.user))
                        
                        }, client.ms(tiempo))
                        
                        miembro.send(client.embed({ title: `${miembro.user.tag} has sido silenciado`, fields: [{ name: 'Servidor', value: `\`\`\`${message.guild.name}\`\`\``, inline: true }, 
                        { name: 'Moderador', value: `\`\`\`${message.author.tag}\`\`\``, inline: true }, { name: 'Tiempo', value: `\`\`\`${param[1]}\`\`\``, inline: true }, { name: 'Razón', value: `\`\`\`${razón}\`\`\``, inline: true }] }, message.author)).catch(err => {})
            
                        inf.set(`${inf.size() + 1}`, { user: miembro.id, infr: 'mute', server: message.guild.id, mod: message.author.id, reason: razón, activity: +new Date() }) 
                    
                    }

                    else {

                        razón = param[1] ? param.slice(1).join(' ') : 'sin razón'

                        message.channel.send(client.embed({ description: `${miembro} (\`${miembro.id}\`) fue silenciado (\`${razón}\`)` }, message.author))

                        miembro.roles.add(rol)
                        
                        miembro.send(client.embed({ title: `${miembro.user.tag} has sido silenciado`, fields: [{ name: 'Servidor', value: `\`\`\`${message.guild.name}\`\`\``, inline: true }, 
                        { name: 'Moderador', value: `\`\`\`${message.author.tag}\`\`\``, inline: true }, { name: 'Razón', value: `\`\`\`${razón}\`\`\``, inline: true }] }, message.author)).catch(err => {})
            
                        inf.set(`${inf.size() + 1}`, { user: miembro.id, infr: 'mute', server: message.guild.id, mod: message.author.id, reason: razón, activity: +new Date() }) 
                    
                    }

                } 

            }

        }
        
    }
}