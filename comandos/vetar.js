module.exports = {
    nombre: 'vetar',
    categoría: 'Moderación',
    desc: 'Veta a un miembro del servidor',
    arg: '<miembro> [tiempo opcional] [razón opcional]',
    apodos: ['ban', 'banear', 'provide'],
    permisoB: 'BAN_MEMBERS',
    permisoU: 'BAN_MEMBERS',
    estado: true,
    run: async(client, message, param) => {
        
        let inf = client.infrs, miembro = message.mentions.members.first() || message.guild.members.resolve(param[0]) || message.guild.members.cache.find(m => m.user.tag === param[0]), 
        tiempo = param[1], razón = param[2] ? param.slice(2).join(' ') : 'sin razón'
        
        if(!miembro || (miembro.id === message.author.id) || (miembro.id === client.user.id)) { return message.channel.send(client.embed({ description: 'No ha especificado el miembro a vetar o el miembro a vetar es incorrecto' }, message.author)) }

        else if(miembro.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) { return message.channel.send(client.embed({ description: 'No puedes vetar a un miembro que tenga la misma o alta jerarquía que yo' }, message.author)) }

        else if(miembro.roles.highest.comparePositionTo(message.member.roles.highest) >= 0) { return message.channel.send(client.embed({ description: 'No puedes vetar a un miembro que tenga la misma o alta jerarquía que usted' }, message.author)) }

        else {
            
            if(ms(tiempo)) {
                
                message.channel.send(client.embed({ description: `${miembro} (\`${miembro.id}\`) fue vetado ${tiempo} (\`${razón}\`)` }, message.author))

                miembro.send(client.embed({ title: `${miembro.user.tag} has sido vetado`, fields: [{ name: 'Servidor', value: `\`\`\`${message.guild.name}\`\`\``, inline: true }, 
                { name: 'Moderador', value: `\`\`\`${message.author.tag}\`\`\``, inline: true }, { name: 'Tiempo', value: `\`\`\`${param[1]}\`\`\``, inline: true }, { name: 'Razón', value: `\`\`\`${razón}\`\`\``, inline: true }] }, message.author)).catch(err => {})

                message.guild.members.ban(miembro, { days: 7, reason: `Petición de ${message.author.tag} a razón de ${razón}` })

                setTimeout(function() { 
                    
                    message.guild.members.unban(miembro, { reason: `Petición acabada de ${message.author.tag} a razón de ${razón}` })

                    message.channel.send(`${miembro}`, client.embed({ description: 'Ha cumplido su sanción' }, miembro.user))
                
                }, client.ms(tiempo))
    
                inf.set(`${inf.size() + 1}`, { user: miembro.id, infr: 'ban', server: message.guild.id, mod: message.author.id, reason: razón, activity: +new Date() }) 
            
            }
            
            else {
                
                message.channel.send(client.embed({ description: `${miembro} (\`${miembro.id}\`) fue vetado ${tiempo} (\`${razón}\`)` }, message.author))

                miembro.send(client.embed({ title: `${miembro.user.tag} has sido vetado`, fields: [{ name: 'Servidor', value: `\`\`\`${message.guild.name}\`\`\``, inline: true }, 
                { name: 'Moderador', value: `\`\`\`${message.author.tag}\`\`\``, inline: true }, { name: 'Razón', value: `\`\`\`${razón}\`\`\``, inline: true }] }, message.author)).catch(err => {})

                message.guild.members.ban(miembro, { days: 7, reason: `Petición de ${message.author.tag} a razón de ${razón}` })
    
                inf.set(`${inf.size() + 1}`, { user: miembro.id, infr: 'ban', server: message.guild.id, mod: message.author.id, reason: razón, activity: +new Date() }) 
                    
            }

        } 
  
    }
}