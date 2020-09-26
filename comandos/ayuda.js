module.exports = {
    nombre: 'ayuda',
    categoría: 'Información',
    apodos: ['help', 'h', 'info'],
    permisoB: 'EMBED_LINKS',
    estado: true,
    run: async(client, message, param, config, idioma) => {
        
        let embed = client.embed({}, message.author)
        
        if(param[0]) { 
            
            let cmd = client.comandos.get(param[0]) || client.comandos.find(cnd => cnd.apodos && cnd.apodos.includes(param[0])), prefijo = await config.prefijo
            
            if(!cmd) { return message.channel.send(client.embed({ description: idioma.ayuda.comando_desconocido.replace('{prefijo}', prefijo) }, message.author)) }

            else {
                
                message.channel.send(client.embed({ title: `${prefijo}${cmd.nombre}`, description: `\`\`\`${cmd.desc ? cmd.desc : idioma.ayuda.sin_descripción }\`\`\``, fields: [{ name: idioma.ayuda.ejemplar, value: `${cmd.ejem ? cmd.ejem.join('\n\n') : idioma.ayuda.sin_ejemplos }`, inline: true }, 
                { name: idioma.ayuda.argumento, value: `\`${cmd.arg ? `${prefijo}${cmd.nombre} ${cmd.arg}` : idioma.ayuda.sin_argumento }\`` }, { name: idioma.ayuda.apodos, value: cmd.apodos.join(', ') }] }, message.author))

            }
        } 
        
        else {

            client.categorías.map(ctg => embed.addField(idioma.categorías[ctg], `\`\`\`${client.comandos.filter(cmd => cmd.categoría === ctg).sort((a, b) => a.nombre).map(cmd => cmd.nombre).join(', ')}\`\`\``, true))
            message.channel.send(embed) 
        
        }

    }
}