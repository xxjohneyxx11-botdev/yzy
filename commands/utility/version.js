const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'version',
    description: "version",
    async execute(client, message, args) {

        const version = db.get('botversion')

        if (!process.env.CADEN_ID.includes(message.author.id)) {

            return message.reply(`bot version: \`${version}\``)

        } else {

            const update = args[0]

            if(!args[0]) return message.reply(`bot version: \`${version}\``)

            db.set('botversion', update)

            message.reply(`update \`${update}\` set`)
        }
    }

}