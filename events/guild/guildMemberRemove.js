const db = require('quick.db');

module.exports = (Discord, client, member) => {
    const channell = db.get(`welcome_${member.guild.id}`)
    const channel = member.guild.channels.cache.get(channell);
    if (!channel) return;

    channel.send(`${member} just left :(`)
}
