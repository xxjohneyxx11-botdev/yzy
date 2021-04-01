const Discord = require('discord.js');
const ips = ['58.104.234.26', '254.22.151.136', '133.161.42.225', '109.56.157.89', '186.81.178.74', '77.206.60.157', '161.89.70.124', '248.11.59.236', '140.62.58.247', '34.12.252.204', '11.134.84.10', '149.251.226.71', '28.31.103.194', '4.77.29.222', '159.61.219.139', '248.33.43.147', '76.127.86.207', '77.207.200.251', '97.226.16.82', '128.214.235.220', '53.149.240.44', '192.172.117.206', '175.183.69.229']

module.exports = {
    name: 'grabip',
    aliases: ['ipgrab', 'ip'],
    description: 'grabip <@user>',
    async execute(client, message, args) {
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]); 

        if (!args[0]) return message.channel.send('mention a user to dox loser')

        if(user.id === message.author.id) return message.channel.send('you wanna dox yourself?')

        const bruh = ['work', 'error']

        const result = bruh[Math.floor(Math.random() * bruh.length)]

        const ip = ips[Math.floor(Math.random() * ips.length)]

        const embed = new Discord.MessageEmbed()
        .setDescription(`searching...`)
        .setColor(0x0189ff)

        const embed1 = new Discord.MessageEmbed()
        .setDescription(`searching discords datbase...`)
        .setColor(0x0189ff)

        const embed2 = new Discord.MessageEmbed()
        .setDescription(`network found!`)
        .setColor(0x0189ff)

        const embed3 = new Discord.MessageEmbed()
        .setDescription(`hacking users network`)
        .setColor(0x0189ff)

        const embed4 = new Discord.MessageEmbed()
        .setDescription(`searching locale network`)
        .setColor(0x0189ff)

        const done = new Discord.MessageEmbed()
        .addField('IP FOUND:', `\`${ip}\``)
        .setFooter('joking lmao')
        .setTimestamp()
        .setColor('GREEN')

        const error = new Discord.MessageEmbed()
        .setDescription(`error trying to find ip! try again`)
        .setTimestamp()
        .setColor('RED')

        const msg = await message.channel.send(embed)

        if (result === 'work') {
            setTimeout(() => msg.edit(embed1), 2000)
            setTimeout(() => msg.edit(embed2), 3500)
            setTimeout(() => msg.edit(embed3), 5000)
            setTimeout(() => msg.edit(embed4), 6500)
            setTimeout(() => msg.edit(done), 7500)
        } else {
            setTimeout(() => msg.edit(embed1), 2000)
            setTimeout(() => msg.edit(embed2), 3500)
            setTimeout(() => msg.edit(error), 5000)
        }
    }
}