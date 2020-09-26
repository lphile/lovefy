module.exports = {
    nombre: 'advertir',
    categoría: 'Moderación',
    desc: 'Avisa a un miembro sobre alguna ocurrencia observada',
    arg: '<miembro> [razón opcional]',
    apodos: ['w', 'warn', 'advise'],
    permisoB: 'EMBED_LINKS',
    permisoU: 'KICK_MEMBERS',
    estado: true,
    run: async(client, message, param) => { 
        
        let inf = client.infrs, miembro = message.mentions.members.first() || message.guild.members.resolve(param[0]) || message.guild.members.cache.find(m => m.user.tag === param[0]),
        razón = param[1] ? param.slice(1).join(' ') : 'sin razón'
        
        if(!miembro) { return message.channel.send(client.embed({ description: 'No ha especificado el miembro a advertir' }, message.author)) }

        else { message.channel.send(client.embed({ description: `${miembro} (\`${miembro.id}\`) fue advertido (\`${razón}\`)` }, message.author))

        miembro.send(client.embed({ title: `${miembro.user.tag} has sido advertido`, fields: [{ name: 'Servidor', value: `\`\`\`${message.guild.name}\`\`\``, inline: true }, 
        { name: 'Moderador', value: `\`\`\`${message.author.tag}\`\`\``, inline: true }, { name: 'Razón', value: `\`\`\`${razón}\`\`\``, inline: true }] }, message.author)).catch(err => {})

        inf.set(`${inf.size() + 1}`, { user: miembro.id, infr: 'warn', server: message.guild.id, mod: message.author.id, reason: razón, activity: +new Date() }) }
        
    }
}