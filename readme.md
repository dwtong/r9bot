To run locally, without having to add slack API token to your environment:


Keeping Heroku dyno awake

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
## Other Tips
- To run this locally, without having to add Slack token to your env, use the command: `SLACK_TOKEN=<your slack API token> node bot.js`
