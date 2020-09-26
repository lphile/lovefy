const { YAMLException } = require('js-yaml')

module.exports = {
    nombre: 'importar',
    categoría: 'Administración',
    desc: 'Gestiona distintas configuraciones del servidor',
    arg: '<archivo>',
    apodos: ['import', 'setting'],
    permisoB: 'ATTACH_FILES',
    estado: true,
    permisoU: 'ADMINISTRATOR',
    run: async(client, message, param) => {

        switch(message.attachments.first().name) {

            case `${message.guild.id}.yaml`: {

                let fsp = require('fs').promises, yarch = await client.axios.get(message.attachments.first().url), err

                /*try { client.yaml.safeLoad(yarch) }
                
                catch(e) { console.log(e) }

                finally { err = null  }

                if(err == null) {*/

                    await fsp.writeFile(`configs/${message.guild.id}.yaml`, yarch.data)

                    message.channel.send(client.embed({ description: `Archivo correctamente importado` }, message.author))

                /*}*/

            }
            break;

            default: { message.channel.send(client.embed({ description: `El nombre del archivo que debe de importarse debe de ser \`${message.guild.id}.yaml\`` }, message.author)) }

        }

    }
}