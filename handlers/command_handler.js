const fs = require('fs');
const Discord = require("discord.js");
const chalk = require('chalk');
const bot = new Discord.Client();

module.exports = (bot, Discord) => {
    const categories = fs.readdirSync('./commands/');

    for (const category of categories) {
        const commandFiles = fs.readdirSync(`./commands/${category}`).filter(File => File.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${category}/${file}`);
            if (command.name) {
                bot.commands.set(command.name, command);
            } else {
                continue;
            }
        }
    }
}