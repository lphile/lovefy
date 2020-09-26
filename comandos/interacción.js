module.exports = {
    nombre: 'interacción',
    categoría: 'Entretenimiento',
    desc: 'Muestra una imagen referente a la interacción requerida',
    arg: '<interacción>',
    apodos: ['fun', 'gif', 'interact'],
    permisoB: 'EMBED_LINKS',
    estado: true,
    run: async(client, message, param) => { 
        
        let miembro = message.mentions.members.first() || message.guild.members.resolve(param[1]) || message.guild.members.cache.find(m => m.user.tag === param[1]), búsqueda, acción

    switch(param[0]) {

        case 'angry': case 'enojarse': { búsqueda = 'angry'; !miembro ? (acción = `¡${message.member.displayName}, no te enfurezcas!`) : (acción = `¡${message.member.displayName} se molestó con ${miembro.displayName}!`) }
        break;

        case 'bite': case 'morder': { búsqueda = 'bite'; !miembro ? (acción = `${message.member.displayName} se está mordiendo nyaaa`) : (acción = `¡${message.member.displayName} mordió a ${miembro.displayName}!`) }
        break;

        case 'blush': case 'sonrojar': { búsqueda = 'blush'; !miembro ? (acción = `${message.member.displayName} se sonroja..`) : (acción = `${message.member.displayName} se sonrojó al ver a ${miembro.displayName}`) }
        break;

        case 'confuse': case 'confundir': { búsqueda = 'confuse'; !miembro ? (acción = `${message.member.displayName} está con dudas `) : (acción = `${message.member.displayName} confundió a ${miembro.displayName}`) }
        break;

        case 'cry': case 'llorar': { búsqueda = 'cry'; !miembro ? (acción = `${message.member.displayName} desahógate, es bueno hacerlo`) : (acción = `${message.member.displayName} llora por ${miembro.displayName}, qué habrá pasado..`) }
        break;

        case 'dance': case 'bailar': { búsqueda = 'dance'; !miembro ? (acción = `¡${message.member.displayName} bailemos!`) : (acción = `${message.member.displayName} le pide bailar a ${miembro.displayName}`) }
        break;

        case 'hug': case 'abrazar': { búsqueda = 'hug'; !miembro ? (acción = `¡${message.member.displayName} dame un abrazo!`) : (acción = `${message.member.displayName} abraza con cariño a ${miembro.displayName}`) }
        break;

        case 'kick': case 'patear': { búsqueda = 'kick'; !miembro ? (acción = `¿Y si te doy unas pataditas ${message.member.displayName}?`) : (acción = `${message.member.displayName} woaa, esa patada a ${miembro.displayName} fue genial`) }
        break;

        case 'kiss': case 'besar': { búsqueda = 'kiss'; !miembro ? (acción = `${message.member.displayName} me dió un beso 😳`) : (acción = `${message.member.displayName} le ha dado un beso a ${miembro.displayName}`) }
        break;

        case 'pat': case 'acariciar': { búsqueda = 'pat'; !miembro ? (acción = `Yo te acaricio ${message.member.displayName}`) : (acción = `${message.member.displayName} acarishia a ${miembro.displayName}`) }
        break;

        case 'punch': case 'golpear': { búsqueda = 'punch'; !miembro ? (acción = `${message.member.displayName}, juego de manos, juego de villanos`) : (acción = `Lamentablemente ${message.member.displayName} no se contuvo y golpeó a ${miembro.displayName}`) }
        break;

        case 'run': case 'correr': { búsqueda = 'run'; !miembro ? (acción = `¡Corre ${message.member.displayName}, correee!`) : (acción = `¡${message.member.displayName} corre satisfactoriamente de ${miembro.displayName}!`) }
        break;

        case 'slap': case 'lapea': { búsqueda = 'slap'; !miembro ? (acción = `${message.member.displayName.slice(-0, -1)}-${message.member.displayName.slice(-2, -3)}`) : (acción = `${message.member.displayName} le da un lapo fuerte a ${miembro.displayName}`) }
        break;

        case 'sleep': case 'dormir': { búsqueda = 'sleep'; !miembro ? (acción = `${message.member.displayName} duerme 💤`) : (acción = `${message.member.displayName} hace dormir a ${miembro.displayName} con sus palabras`) }
        break;

        default: { return message.channel.send(client.embed({ description: 'Interacción inválida, vea la información de comando para guiarse de las interacciones disponibles' }, message.author)) }

    }
        
        await client.axios.get(`https://api.tenor.com/v1/random?key=KQ73MW68UNVY&q=anime-${búsqueda}&limit=1`)
        .then(res => { let gif = res.data.results[0].media[0].gif.url; message.channel.send(client.embed({ title: acción, image: { url: gif } }, message.author)) })

    }
}