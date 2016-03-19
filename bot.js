var Botkit = require('botkit');
var HerokuKeepalive = require('@ponko2/botkit-heroku-keepalive');

var controller = Botkit.slackbot({
  debug: false
});

// Check that slack API token is specified in environment
if (!process.env.SLACK_TOKEN) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var herokuKeepalive;

// Ensure that Heroku server doesn't sleep
controller.setupWebserver(process.env.PORT || 8080, function (err, webserver) {
  herokuKeepalive = new HerokuKeepalive(controller);
});

// connect the bot to slack, using API token stored in environment
controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM(function (err) {
  if (err) {
    throw new Error(err);
  }

  herokuKeepalive.start();
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

// Ensure that Heroku server doesn't sleep
var herokuKeepalive;

controller.setupWebserver(process.env.PORT || 8080, function (err, webserver) {
  herokuKeepalive = new HerokuKeepalive(controller);
});

controller.spawn({
  token: process.env.BOTKIT_SLACK_TOKEN
}).startRTM(function (err) {
  if (err) {
    throw new Error(err);
  }

  herokuKeepalive.start();
});
