module.exports = {
    name: 'count',
    description: "count <text>",
    execute(client, message, args) {

        const msg = args.slice(0).join(' ');
        if (!msg) return message.channel.send('please give me a message to count!')

        function WordCount(str) { 
            return str.split(" ").length;
        }

        let character = 'character'
        if (msg.length > 1) character = 'characters'

        let word = 'word'
        if (WordCount(msg) > 1) word = 'words'

        message.channel.send(`**that message is** \`${msg.length}\` **${character} and** \`${WordCount(msg)}\` **${word}**`)
    }
}