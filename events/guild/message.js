const Discord = require("discord.js");
const bot = new Discord.Client();
const db = require('quick.db');
const ms = require('ms');
const moment = require('moment');

const cooldowns = new Map();
module.exports = (Discord, bot, message) => {

    if (message.channel.type == 'dm') return

    let prefix = db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = 'yzy '

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = bot.commands.get(cmd) || bot.commands.find(c => c.aliases && c.aliases.includes(cmd));

    if (!command) return

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if (time_stamps.has(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if (current_time < expiration_time) {
            let time_left = (expiration_time - current_time) / 1000;

            function msToTime(ms) {
                days = Math.floor(ms / 86400000);
                daysms = ms % 86400000;
                hours = Math.floor(daysms / 3600000);
                hoursms = ms % 3600000;
                minutes = Math.floor(hoursms / 60000);
                minutesms = ms % 60000;
                sec = Math.floor(minutesms / 1000);
    
                let str = "";
                if (days) str = str + days + " days, ";
                if (hours) str = str + hours + " hours, ";
                if (minutes) str = str + minutes + " minutes, ";
                if (sec) str = str + sec + " seconds";
    
                return str;
            }

            let timee = 'seconds'

            if (time_left > 60) time_left = Math.floor(time_left / 60);
            if (time_left > 60) timee = 'minutes'

            const embed = new Discord.MessageEmbed()
                .setDescription(`**please wait** \`${(time_left.toFixed(1))}\` **more ${timee} before using this again**`)
                .setColor(0x0189ff)
            return message.channel.send(embed);
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    const channell = db.get(`cmdlogs_${message.guild.id}`)

    const channel = message.guild.channels.cache.get(channell);
    
    try {

        if (command) command.execute(bot, message, args, Discord);

        console.log(`> ${cmd} command was used by ${message.author.username} in ${message.guild.name}`)

        if (!channel) return;

        const embedddd = new Discord.MessageEmbed()
        .setDescription(`**${cmd}** command was used by **${message.author.tag}** in <#${message.channel.id}>`)
        .setTimestamp()
        .setColor(0x0189ff)

        channel.send(embedddd)

    } catch (err) {

        const embed2 = new Discord.MessageEmbed()
            .setTitle(`there was an error trying to execute that command`)
            .setDescription(`\n\`\`\`javascript\n${err.message}\n\`\`\``)
            .setColor(0x0189ff)

        message.channel.send(embed2);

        console.log(err);
    }

}