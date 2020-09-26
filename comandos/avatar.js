module.exports = {
    nombre: 'avatar',
    categoría: 'Información',
    desc: 'Muestra el avatar o ícono de miembro/servidor',
    arg: `<miembro | 'servidor'>`,
    apodos: ['foto', 'icon', 'ícono'],
    permisoB: 'EMBED_LINKS',
    estado: true,
    run: async(client, message, param) => { let miembro = message.mentions.users.first() || client.users.resolve(param[0]) || client.users.cache.find(m => m.username === param[0] || m.tag === param[0]) || message.author

        switch(param[0]) {
            case 'servidor': case 'server': {
                message.channel.send({ embed: { color: '0x2F3136', title: message.guild.name, description: `[webp](${message.guild.iconURL({ format: 'webp', size: 1024 })}) [png](${message.guild.iconURL({ format: 'png', size: 1024 })}) [gif](${message.guild.iconURL({ format: 'gif', size: 1024 })})`,
                image: { url: message.guild.iconURL({ dynamic: true, size: 1024 }) } } })
            }
            break;
            default: {
                message.channel.send({ embed: { color: '0x2F3136', title: miembro.tag, description: `[webp](${miembro.displayAvatarURL({ format: 'webp', size: 1024 })}) [png](${miembro.displayAvatarURL({ format: 'png', size: 1024 })}) [gif](${miembro.displayAvatarURL({ format: 'gif', size: 1024 })})`,
                image: { url: miembro.displayAvatarURL({ dynamic: true, size: 1024 }) } } })
            }
        }
    }
}