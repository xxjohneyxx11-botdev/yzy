const Discord = require("discord.js");
const bot = new Discord.Client();


module.exports = {
    name: 'invite',
    aliases: ['inv'],
    description: "invite",
    async execute(client, message, args) {
        const embed = new Discord.MessageEmbed()
        .setDescription('INVITE ME TO YOUR SERVERS! **[CLICK HERE](https://discord.com/oauth2/authorize?client_id=815385417653813289&scope=bot&permissions=2097016054)**')
        .setColor(0x0189ff)   
        message.channel.send(embed);
    }     
}