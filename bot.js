var Botkit = require('botkit');
var http = require('http');

var controller = Botkit.slackbot({
  debug: false
});

// Check that slack API token is specified in environment
if (!process.env.SLACK_TOKEN) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

// connect the bot to slack, using API token stored in environment
controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM(function (err) {
  if (err) {
    throw new Error(err);
  }

});

// Tell the user the number of days left until demo day
controller.hears('.*(demo day).*', ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  var DAY = 1000 * 60 * 60 * 24;

  // Calculate number of days until demo day
  var daysLeft = function() {
    var today = new Date();
    var demoDay = new Date('06/02/2016');
    return Math.round((demoDay.getTime() - today.getTime()) / DAY);
  }();

  bot.reply(message, 'Only ' + daysLeft + ' days left until demo day!');
});

// Say unicorn facts whenever anyone mentions unicorns
controller.hears('.*(unicorn).*', ['ambient'], function(bot, message) {
  var facts = require('./unicorn-facts');

  // Choose random fact from array of facts
  var fact = facts[Math.floor(Math.random() * facts.length)];
  bot.reply(message, fact);
});

// To keep Heroku's free dyno awake
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Ok, dyno is awake.');
}).listen(process.env.PORT || 5000);
