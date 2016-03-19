## Purpose
A Slack bot I've created for the teams in the [R9 Accelerator 2.0 programme](http://www.r9accelerator.co.nz/).

## Getting set up
1. Fork or clone this repo
2. Run `npm install` in repo directory.

## Setting up Slack
1. Create a new Bot [Custom Integration](https://my.slack.com/apps/manage/custom-integrations) in Slack.
2. Give it a name, and take note of the API Token.

## Setting Up Heroku
1. Ensure that you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.
2. Create a new app in Heroku:
  - `heroku create`
3. Update Heroku env variables:
    - `heroku config:set SLACK_TOKEN=<your slack API token>`
    - `heroku config:add TZ="Pacific/Auckland"` (or choose your own timezone)
4. Set up a heroku scheduler to make a request to the app server every 10 mins, to keep the dyno awake on Heroku free tier
    - `heroku addons:create scheduler:standard`
    - `heroku addons:open scheduler`
    - Set command to make a curl request to your heroku web server every 10 mins

## Other Tips
- To run this locally, without having to add Slack token to your env, use the command: `SLACK_TOKEN=<your slack API token> node bot.js`.
- Otherwise, add your slack token to your local env.
