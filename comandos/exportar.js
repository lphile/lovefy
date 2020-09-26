module.exports = {
    nombre: 'exportar',
    categoría: 'Administración',
    desc: 'Gestiona distintas configuraciones del servidor',
    arg: '<sin argumento>',
    apodos: ['export'],
    permisoB: 'ATTACH_FILES',
    estado: true,
    permisoU: 'ADMINISTRATOR',
    run: async(client, message) => {
        
        message.channel.send(new client.discord.MessageAttachment(client.fisy.createReadStream(`configs/${message.guild.id}.yaml`)))

    }
}