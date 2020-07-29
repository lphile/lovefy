const { MessageEmbed } = require("discord.js"), c = require("/app/config.json"), { crearDB } = require("megadb"), db = new crearDB("rroles")

module.exports = async (client, message, args) => { }

module.exports.help = { nombre: "rroles", desc: "rroles", apagado: false, args: false, uso: "set <afijo>", alias: ["rroles", "rroles"], permiso: "ADMINISTRATOR", exm: ["rroles"] }