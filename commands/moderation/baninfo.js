const Discord = require("discord.js");
const bot = new Discord.Client();
const randomstring = require("randomstring");
const db = require('quick.db');

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `BAN_MEMBERS` permission')
    .setColor(0x0189ff)

const embed2 = new Discord.MessageEmbed()
.setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`baninfo <ban id>\`\`\``)
    
const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `BAN_MEMBERS` permission')
    .setColor(0x0189ff)

module.exports = {
    name: 'baninfo',
    description: "baninfo <ban id>",
    async execute(client, message, args) {

        const id = args[0]

        if(!args[0]) return message.channel.send(embed2)

        const info = db.get(`ban_${id}`)

        const embed = new Discord.MessageEmbed()
        .setTitle(`baninfo for: \`${id}\``)
        .setDescription(`${info}`)
        .setFooter(`Requsted by: ${message.author.username}`)
        .setTimestamp()
        .setColor(0x0189ff)

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.channel.send(embed3);
        } else {
            message.channel.send(embed)
        }
        
    }

}