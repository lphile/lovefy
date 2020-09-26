module.exports = {
  nombre: 'borrar',
  categoría: 'Moderación',
  desc: 'Borra mensajes específicos de un canal',
  arg: '<opción> <monto> <valores>',
  apodos: ['clear', 'purge', 'eliminar'],
  permisoB: 'MANAGE_MESSAGES',
  permisoU: 'MANAGE_MESSAGES',
  estado: false,
  run: async (client, message, param) => {

    if(!param[1] || (isNaN(param[1])) && !param[2]) { message.channel.send(client.embed({ description: 'No ha especificado el monto de mensajes a borrar o el monto es incorrecto' }, message.author)) }

    let monto = param[2] ? parseInt(param[2]) : parseInt(param[1])

    if(!isNaN(monto) && monto <= 100 && monto >= 1) {
        
        await message.delete()
        
        switch(param[1]) {

            case 'todo': case 'nuke': case 'canal': {
                    
                message.channel.send(client.embed({ description: `Confirma reaccionando si quiere o no eliminar todos los mensajes de ${message.channel} (clonar el canal y eliminar el original`,
                fields: [{ name: '\u200b', value: 'Reaccione a <:si:708080185886638094> para aceptar la confirmación o <:no:708080202189635647> para rechazarla, el tiempo para reaccionar es de **10 segundos**' }] }, message.author))
                .then(async function(msg) { await msg.react('708080185886638094'), msg.react('708080202189635647')
                                                                                                                                      
                let fil = (reaction, user) => { return ['708080185886638094', '708080202189635647'].includes(reaction.emoji.id) && user.id === message.author.id }
                
                msg.awaitReactions(fil, { max: 1, time: 10000, errors: ['time'] }).catch(() => { 
                    
                    msg.edit(client.embed({ description: 'El tiempo se ha acabado, vuelva a ejecutar el comando y confirme' }, message.author))
                    .then(m => m.delete({ timeout: 5000 })) }).then(async col => { let reacción = col.first()
                        
                        if(reacción.emoji.id === '708080185886638094') { 
                            await can.clone({ name: can.name, reason: 'Simulación' }).then(async function(c) { 
                                
                                await can.delete()
                                
                                await c.send(new MessageEmbed()
                .setDescription("Simulación hecha sobre borrar todos los mensajes de un canal").setColor(color).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL())) }) } 
                                                                                                   
                else if(reacción.emoji.id === '708080202189635647') { message.channel.send(new MessageEmbed().setDescription("Acción cancelada, gracias por la confirmación").setColor(color)
                  .setTimestamp().setAuthor(message.guild.name, message.guild.iconURL())); message.channel.messages.fetch(ms.id).delete() } }) })


            }
            
            case 'miembros': case 'miembro': case 'member': {

                let miembros = message.mentions.users.size ? message.mentions.users.keyArray() : args.slice(3)
                
                if(!param[3] || !miembros) { message.channel.send(client.embed({ description: 'Mencione a los miembros los cuales se eliminarán el monto de mensajes' }, message.author)) }
                
                let mensajes = await message.channel.messages.fetch({ limit: monto }, false)
                
                mensajes.sweep((m) => !miembros.includes(m.author.id))
            
                await message.channel.bulkDelete(mensajes, true)
                
                message.channel.send(client.embed({ description: `Se eliminaron ${mensajes.size} mensajes correctamente` }, message.author)).then(msg => { msg.delete({ timeout: 5000 }) })
            
            }
            break;

            case 'bots': case 'robots': {

                let mensajes = await message.channel.messages.fetch({ limit: monto }, false)

                mensajes.sweep((m) => !m.author.bot)

                await message.channel.bulkDelete(mensajes, true)
                
                message.channel.send(client.embed({ description: `Se eliminaron ${mensajes.size} mensajes correctamente` }, message.author)).then(msg => { msg.delete({ timeout: 5000 }) })
          
            }
            break;

            case 'archivos': case 'attachments': {
                
                let mensajes = await message.channel.messages.fetch({ limit: monto }, false)
            
                mensajes.sweep((m) => !m.attachments.first())

                await message.channel.bulkDelete(mensajes, true)
                
                message.channel.send(client.embed({ description: `Se eliminaron ${mensajes.size} mensajes correctamente` }, message.author)).then(msg => { msg.delete({ timeout: 5000 }) })
          
            }
            break;
        
            case 'embebidos': case 'embeds': { 

                let mensajes = await message.channel.messages.fetch({ limit: monto }, false)
            
                messages.sweep((m) => !m.embeds[0])

                await message.channel.bulkDelete(mensajes, true)
                
                message.channel.send(client.embed({ description: `Se eliminaron ${mensajes.size} mensajes correctamente` }, message.author)).then(msg => { msg.delete({ timeout: 5000 }) })
          
            }
            break;
        
            case 'incluye': case 'include': {

                let mensajes = await message.channel.messages.fetch({ limit: monto }, false)
            
                messages.sweep((m) => !new RegExp(args.slice(3).join(" "), "gmi").test(m.content))
            
                await message.channel.bulkDelete(mensajes, true)
                
                message.channel.send(client.embed({ description: `Se eliminaron ${mensajes.size} mensajes correctamente` }, message.author)).then(msg => { msg.delete({ timeout: 5000 }) })
          
            }
            break;
        
            default: { await message.channel.bulkDelete(monto, true) }
      
        }
    
    } 
    
    else {
        
        if (isNaN(monto)) { message.channel.send(client.embed({ description: `El monto a borrar no es un número entero` }, message.author)) } 
        
        else if (100 < monto < 1) { message.channel.send(client.embed({ description: `El monto a borrar debe ser mayor a **0** y menor a **100**` }, message.author)) } 

    }

  }
}
