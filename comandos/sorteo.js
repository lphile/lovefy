module.exports = {
    nombre: 'sorteo',
    categoría: 'Utilidd',
    desc: 'Gestiona sorteos del servidor',
    arg: '<tiempo> <ganadores> [ítem]',
    apodos: ['giveaway', 'raffle', 'regalo'],
    permisoU: 'MANAGE_GUILD' || 'Regalador',
    permisoB: 'EMBED_LINKS',
    estado: true,
    run: async(client, message, param) => {

        let tiempo = param[0], ganadores = parseInt(param[1]), ítem = param.slice(2).join(' ')

        if(!tiempo || tiempo < 3600000) { return message.channel.send(client.embed({ description: 'No ha proporcionado el tiempo indicado para el sorteo' }, message.author)) }
        else if(!ganadores) { return message.channel.send(client.embed({ description: 'No ha proporcionado la cantidad de ganadores para el sorteo' }, message.author)) }
        else if(!ítem) { return message.channel.send(client.embed({ description: 'No ha proporcionado el ítem indicado para el sorteo' }, message.author)) }

        tiempo = client.ms(param[0])
        
        client.sorteos.start(message.channel, {
            time: tiempo,
            prize: ítem,
            winnerCount: ganadores,
            reaction: await config.sorteos.reacción,
            messages: {
                giveaway: '🎉 **SORTEO INICIADO** 🎉',
                giveawayEnded: '🎉 **SORTEO FINALIZADO** 🎉',
                timeRemaining: 'Tiempo restante: **{duration}**',
                inviteToParticipate: `¡Reacciona con ${config.sorteos.reacción ? client.emojis.resolve(await config.sorteos.reacción) : '🎉'} para participar en este sorteo!`,
                winMessage: '¡Felicidades {winners}! la recompensa es **{prize}**',
                embedFooter: 'Sorteos',
                noWinner: `Sorteo cancelado al no obtener los participantes suficientes **(${ganadores})**`,
                hostedBy: 'Creado por: {user}',
                winners: 'ganador(es)',
                endedAt: 'Termina',
                units: {
                    seconds: 'segundos',
                    minutes: 'minutos',
                    hours: 'horas',
                    days: 'días',
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        })

    }
}