const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'leaderboard',
    description: "leaderboard",
    execute(client, message, args) {       
        let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
        if (!money.length) {
            let noEmbed = new Discord.MessageEmbed()
                .setDescription("nothing to see here yet!")
                .setColor(0x0189ff)
            return message.channel.send(noEmbed)
        };

        money.length = 5;
        var finalLb = "";
        for (var i in money) {
            if (money[i].data === null) money[i].data = 0
            finalLb += `**${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - \`${money[i].data}\` 💵\n`;
        };

        const embed = new Discord.MessageEmbed()
            .setTitle(`TOP 5 GLOBAL LEADERBOARD`)
            .setDescription(finalLb)
            .setColor(0x0189ff)
            .setTimestamp()
        message.channel.send(embed);
    }
}
