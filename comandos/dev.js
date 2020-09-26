module.exports = {
    nombre: 'dev',
    apodos: ['inspect', 'develop', 'api'],
    estado: true,
    permisoU: 'Desarrollador',
    run: async(client, message, param, config) => {
        
        let inf = client.infrs
        
        switch(param[0]) {
            
            case 'eval': case 'evaluar': {
                
                let texto = param.slice(1).join(' ')

                if(!param[1]) {

                    message.channel.send(client.embed({ fields: [{ name: 'Entrada', value: `\`\`\`js\nNada jajaja\n\`\`\``, inline: true }, { name: 'Salida', value: `\`\`\`js\nconsole.log('Qué voy a enviar gil jajaja')\n\`\`\`` }] }, message.author))

                }
                
                else try {
                    
                    let code = client.util.inspect(await eval(`(async () => { ${texto} }) ()`), { depth: 0 })
                    
                    message.channel.send(client.embed({ fields: [{ name: 'Tipo', value: `\`\`\`${typeof code}\`\`\``, inline: true},
                    { name: 'Entrada', value: `\`\`\`js\n${param.slice(1).join(' ')}\n\`\`\``, inline: true }, { name: 'Salida', value: `\`\`\`js\n${code.slice(0, 1900)}\n\`\`\`` }] }, message.author))
                
                } 
                
                catch(err) {

                    message.channel.send(client.embed({ fields: [{ name: 'Tipo', value: `\`\`\`${typeof code}\`\`\``, inline: true},
                    { name: 'Entrada', value: `\`\`\`js\n${param.slice(1).join(' ')}\n\`\`\``, inline: true }, { name: 'Salida', value: `\`\`\`js\n${err.name}: ${err.message.slice(0, 1900)}\n\`\`\`` }] }, message.author))

                }
        
            }
    
        }

    }

}