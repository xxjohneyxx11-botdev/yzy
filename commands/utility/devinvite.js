const sourcebin = require('sourcebin');
const {
    MessageEmbed,
    ReactionCollector,
    Invite
} = require('discord.js');

module.exports = {
    name: 'sinvite',
    aliases: ['sinv'],
    description: "sinvite",
    async execute(client, message, args) {
        message.channel.createInvite({unique: true})
        .then(Invite => {
            message.channel.send(`https://discord.gg/${Invite.code}`)
        })
    }

}