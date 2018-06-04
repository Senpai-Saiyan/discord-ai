global.Discord = require('discord.js');
global.settings = require('./../settings.json');
global.bot = require('./bot');
global.pandorabot = require('./pandorabot')
bot.on("ready", () => {
    settings.channels.map((c) => {
    })
    //cleverbot.setNick(bot.user.username);
});

bot.on("message", async function (message) {
    if (settings.channels.includes(message.channel.id) && message.author.id != bot.user.id) {
        console.log(message.author.tag + " : " + message.cleanContent);
        let reset = false;
        if (message.cleanContent.startsWith("!reset"))
            reset = true;
        let response = await pandorabot(message.cleanContent, message.author.username, reset);
        console.log("me : " + response);
        message.channel.send(response);
    }
});
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);