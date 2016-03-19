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
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }

});

// Web server that can be pinged to keep Heroku's free tier dyno awake
http.createServer(function(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('Ok, dyno is awake.');
}).listen(process.env.PORT || 5000);

// Tell the user the number of days left until demo day
// Only respond when user mentions bot's username or dm's it
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
// Listens to all messages in channel - user doesn't need to dm bot
controller.hears('.*(unicorn).*', ['ambient'], function(bot, message) {
  var facts = require('./unicorn-facts');

  // Choose random fact from array of facts
  var fact = facts[Math.floor(Math.random() * facts.length)];
  bot.reply(message, fact);
});

// Respond when user says thanks
controller.hears(['thanks', 'thank you'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  var replies = ['The pleasure is all mine.', 'No, thank you.', 'No worries! That\'s what I\'m here for.'];

  // Choose random reply
  var reply = replies[Math.floor(Math.random() * replies.length)];
  bot.reply(message, reply);
});
