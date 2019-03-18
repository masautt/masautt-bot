//Author:       Marek Sautter
//Title:        Masautt-Bot
//Function:     Facebook Messenger Bot for Masautt Page
//File:         App.js
//File Funct:   3 Endpoints for defining the bot, verifying the bot, and receiving bot data

//Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sendMessage = require('./proc');
require('dotenv').config();

//Variables
const verify_token = process.env.VERIFY_TOKEN;
const port = process.env.PORT;

//App configuration
app.use(bodyParser.json())

app.get('/about', function(req, res) {
    res.send('This is the webhook for Masautt-Bot. For more information please visit the Masautt-Bot facebook page');
});

//This function establishes the webhook with facebook messenger
app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === verify_token) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

//Default function for any incoming messages to our webhook from facebook
app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
        if (event.message && event.message.text) {
            text = event.message.text;

            //Decision Time: ************************************
            sendMessage(sender, text);
        }
    }
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Masaut-Bott on port ${port}!`))