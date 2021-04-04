const Discord = require("discord.js");
const bot = new Discord.Client();
const db = require('quick.db');
require('dotenv').config();

bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
        require(`./handlers/${handler}`)(bot, Discord);
});

bot.on("message", message => {

        const modid = db.get(`modlogs_${message.guild.id}`)
        const modlogs = message.guild.channels.cache.get(modid);
        if (!modlogs) return;

        const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`<:news:824460711220215879> **invite posted in** <#${message.channel.id}> **by** <@${message.author.id}>`)
                .addField('MESSAGE:', `\`\`\`fix\n${message.content}\`\`\``)
                .setFooter(`MSG ID: ${message.id} | USER ID: ${message.author.id}`)
                .setColor(0x0189ff)
                .setTimestamp()

        if (message.content.includes("discord.gg/")) return modlogs.send(embed)
});

bot.login(process.env.DISCORD_TOKEN)
