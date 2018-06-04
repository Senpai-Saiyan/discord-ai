const request = require('request-promise-native');
const xml = require('./xml2js');
let sessionids = {};
try {
    sessionids = require('./../sessions.json');
}
catch (e) {
    console.log("no sessions")
}
const bot_url = settings.bot_url || "https://www.pandorabots.com/pandora/talk-xml?botid=fcf9a278fe345dcf&";
const querystring = require('querystring');
const fs = require('fs');
module.exports = async function (question, client_name, reset) {
    let formdata = {
        input: question
    };
    if (sessionids[client_name] && !reset) {
        formdata.custid = sessionids[client_name];
    }
    else {
        setTimeout(saveSession, 2000)
        formdata.input = "My name is " + client_name + ". " + formdata.input
    }
    let res = await request(bot_url + querystring.stringify(formdata))
    console.log(res);
    res = await xml(res);
    console.log(res);
    res = res.result;
    if (!sessionids[client_name] || reset)
        sessionids[client_name] = res.$.custid;
    return res.that[0].replace(/<br>/g, "\n");
}
function saveSession() {
    fs.writeFile("sessions.json", JSON.stringify(sessionids), () => console.log("saved"));
}
saveSession()