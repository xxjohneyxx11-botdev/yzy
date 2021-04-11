const Discord = require("discord.js");

const numberMap = {
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
  };
  
const embed = new Discord.MessageEmbed()
.setTitle('**❌ INVALID USAGE**')
.setColor(0x0189ff)
.setDescription(`\`\`\`emojify <text>\`\`\``)

module.exports = {
    name: 'emojify',
    description: 'emojify <text>',
    execute(client, message, args) {
        if (!args[0]) return message.channel.send(embed);
        let msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);
        msg = msg.split('').map(c => {
          if (c === ' ') return c;
          else if (/[0-9]/.test(c)) return numberMap[c];
          else return (/[a-zA-Z]/.test(c)) ? ':regional_indicator_' + c.toLowerCase() + ':' : '';
        }).join('');
    
        if (msg.length > 2000) {
          return message.channel.send('must be 2000 or fewer in length.')
        }
        
        message.channel.send(msg);      
    }
}