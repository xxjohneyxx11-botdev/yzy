const Discord = require("discord.js");
const bot = new Discord.Client();
const humanizeDuration = require("humanize-duration");
const db = require('quick.db');
const ms = require('ms');
const moment = require('moment');

require("../../inlineReply.js")

const cooldowns = new Map();
module.exports = async (Discord, bot, message) => {

    if (message.channel.type == 'dm') return

    let prefix = db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = 'yzy '

    // message count

    db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
    db.add(`guildMessages_${message.guild.id}`, 1)

    // check if mentions

    if (message.mentions.has(bot.user) && !message.mentions.has(message.guild.id)) {
        return message.inlineReply(`my prefix here is: \`${prefix}\``)
    }

    // reactions 

    //if (message.content.includes("gay")) return message.react("🏳️‍🌈");
    //if (message.content.includes("ok")) return message.react("🆗");

    // anti link
    /*
    const bruh = db.get(`antilink_${message.guild.id}`)
    if (bruh === null) return

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return
    if (message.member.permissions.has("MANAGE_MESSAGES")) return

    function is_url(str) {
        let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)) {
            return true;
        } else {
            return false;
        }

    }

    if (bruh === false) {
        return
    } else {
        if (is_url(message.content) === true) {

            if (message.deletable) message.delete()
            const msg = await message.reply(`sending that link isnt allowed here 😡`)
            setTimeout(() => msg.delete(), 3000)

            const embed1 = new Discord.MessageEmbed()
                .setDescription(`<:news:824460711220215879> **MESSAGE IN** <#${message.channel.id}> **WAS AUTO DELETED**`)
                .addField('MESSAGE:', `\`\`\`fix\n${message.content}\`\`\``)
                .addField('AUTHOR:', `\`\`\`fix\n${message.author.tag}\`\`\``)
                .setColor(0x0189ff)
                .setTimestamp()

            const embed2 = new Discord.MessageEmbed()
                .setDescription(`<:news:824460711220215879> **YOUR MESSAGE IN** <#${message.channel.id}> **WAS AUTO DELETED**`)
                .addField('MESSAGE:', `\`\`\`fix\n${message.content}\`\`\``)
                .setColor(0x0189ff)
                .setTimestamp()

            const channell = db.get(`modlogs_${message.guild.id}`)

            const channel = message.guild.channels.cache.get(channell);
            if (!channel) return;

            channel.send(embed1)
            //message.author.send(embed2)

        }
    }
    */

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
            let time_left = (expiration_time - current_time)

            const humanized = humanizeDuration(time_left, {
                round: true
            });

            const embed = new Discord.MessageEmbed()
                .setDescription(`**please wait** \`${humanized}\` **before using \`${cmd}\` again**`)
                .setColor(0x0189ff)
            return message.channel.send(embed);
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    // cmdlogs

    const channell = db.get(`cmdlogs_${message.guild.id}`)
    const channel = message.guild.channels.cache.get(channell);

    //const errlogs = client.channels.cache.get('827290695340916746')

    try {

        // execute commands

        if (command) command.execute(bot, message, args, Discord);
        console.log(`> ${cmd} command was used by ${message.author.username} in ${message.guild.name}`)
        if (!channel) return;

        const embed1 = new Discord.MessageEmbed()
            .setDescription(`**${cmd}** command was used by **${message.author.tag}** in <#${message.channel.id}>`)
            .setTimestamp()
            .setColor(0x0189ff)
        channel.send(embed1)

    } catch (err) {

        const embed2 = new Discord.MessageEmbed()
            .setTitle(`there was an error trying to execute that command`)
            .setDescription(`\n\`\`\`javascript\n${err.message}\n\`\`\``)
            .setColor(0x0189ff)

        const embed3 = new Discord.MessageEmbed()
            .setTitle(`there was an error trying to execute ${cmd} in <#${message.channel.id}>`)
            .setDescription(`\n\`\`\`javascript\n${err.message}\n\`\`\``)
            .setColor(0x0189ff)

        message.channel.send(embed2);
        //errlogs.send(embed3)

        console.log(err);
    }

}