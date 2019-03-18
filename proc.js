//Author:       Marek Sautter
//Title:        Masautt-Bot
//Function:     Facebook Messenger Bot for Masautt Page
//File:         res.js
//File Funct:   Craft Responses to messages

//Dependencies
const request = require('request');
require('dotenv').config();

//Variables
const access_token = process.env.ACCESS_TOKEN;
let startMenuRaw = require("./menus/start.JSON")

let startMenu = JSON.parse(startMenuRaw)
console.log(startMenu)
// const firstMenu = require("./menus/firstAm/services.JSON")
//Exports
module.exports = sendMessage;

function sendMessage(sender, text) { 
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:access_token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: startMenu,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

function processMessage(text) {
    if (text == '1') return "You chose the first option";
    if (text == '2') return "You chose the second option";
    if (text == '3') return "You chose the third option";

    return "Please pick an option 1-3"
}

