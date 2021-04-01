const Discord = require("discord.js");
const bot = new Discord.Client();
const db = require('quick.db');
require('dotenv').config();

require("./inlineReply.js")

bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
        require(`./handlers/${handler}`)(bot, Discord);
})


bot.on("message", message => {
        //if (message.content.includes("gay")) return message.react("🏳️‍🌈");
        //if (message.content.includes("ok")) return message.react("🆗");
});

/*
bot.on("message", async message => {

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
});
*/


bot.on("message", message => {

        if (message.channel.type == 'dm') return

        if (message.author.bot) return

        let prefix = db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = 'yzy'

        const owner = bot.users.cache.get('742853857104887820').tag

        const embed = new Discord.MessageEmbed()
                .setTitle('YEEZY BOT')
                .setThumbnail('https://cdn.discordapp.com/avatars/815385417653813289/d2542e01e623124116fe7ef67ae4e2b0.webp?size=1024')
                .setDescription(`you can see all my commands by using \`${prefix}help\` :)`)
                .addField('INVITE ME', `you can invite me to your servers by clicking [here](https://discord.com/oauth2/authorize?client_id=815385417653813289&scope=bot&permissions=2097016054)!`)
                .addField('SUPPORT SERVER', `if you have a suggestion, found a bug, or just wanna hang out, join the yzy bot [support server](https://discord.gg/uKe9qjqchH)!`)
                .setFooter(`DM ${owner} to speak with the developer!`)
                .setColor(0x0189ff);
        try {
                if (message.mentions.has(bot.user) && !message.mentions.has(message.guild.id)) {
                        return message.inlineReply(`my prefix here is: \`${prefix}\``)
                }
        } catch {
                return;
        };
});

bot.on("message", message => {

        if (message.channel.type == 'dm') return

        db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
        db.add(`guildMessages_${message.guild.id}`, 1)
});

bot.login(process.env.DISCORD_TOKEN)