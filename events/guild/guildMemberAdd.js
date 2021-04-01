const db = require('quick.db');

module.exports = (Discord, client, member) => {
    const channell = db.get(`welcome_${member.guild.id}`)
    let msg = db.get(`welcomemsg_${member.guild.id}`)

    const channel = member.guild.channels.cache.get(channell);

    if (!channel) return;
    if (msg === null) msg = `just joined :)`

    channel.send(`${member}, ${msg}`)
}