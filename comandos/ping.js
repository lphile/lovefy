module.exports = {
    nombre: 'ping',
    categoría: 'Información',
    desc: 'Informa la latencia habida por el cliente',
    apodos: ['latencia', 'latency', 'apims'],
    permisoB: 'EMBED_LINKS',
    estado: true,
    run: async(client, message, param) => { let ws = Math.round(client.ws.ping), me = +new Date() - message.createdTimestamp
        
        message.channel.send({ embed: { color: me < 2000 ? 'GREEN' : 'YELLOW', title: me < 2000 ? 'Latencia aceptable' : 'Latencia entrecortada', fields: [{ name: 'API', value: `\`\`\`${ws} milisegundos\`\`\``}, 
                { name: 'Mensaje', value: `\`\`\`${me} milisegundos\`\`\``}] } })

    }
}