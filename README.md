# Slack-Slash-Todos-Bot
<hr>

## Slack Integration
<hr>

You can integrate this slash bot into your slack team/workspace. Follow the below steps to integrate:
1) Open https://[YOUR_TEAM_DOMAIN].slack.com/apps/manage/custom-integrations
2) Click on Slash Commands
3) Then Click on Add Configuration
4) Now Configure for /addtodo

```sh
Choose a Command: /addtodo

Click on "Add Slash Command Integration"

Now in integration settings:
Command: /addtodo
URL: http://35.244.41.17/api/addtodo
Method: POST
Autocomplete help text:
  a) select checkbox "Show this command in the autocomplete list"
  b) Description: Add a TODO
  c) Usage Hint: /addtodo Create Game
```

5) Similarly configure for /marktodo and /listtodos

```sh
Choose a Command: /marktodo

Click on "Add Slash Command Integration"

Now in integration settings:
Command: /marktodo
URL: http://35.244.41.17/api/marktodo
Method: POST
Autocomplete help text:
  a) select checkbox "Show this command in the autocomplete list"
  b) Description: Mark a todo as completed
  c) Usage Hint: /marktodo Create Game
```

```sh
Choose a Command: /listtodos

Click on "Add Slash Command Integration"

Now in integration settings:
Command: /listtodos
URL: http://35.244.41.17/api/listtodos
Method: POST
Autocomplete help text:
  a) select checkbox "Show this command in the autocomplete list"
  b) Description: List of pending todos
  c) Usage Hint: /listtodos
```

<hr>

## Features
1) Add a todo.
2) Mark todo as done.
3) List all pending todos.
4) Every Channel of Every Team have different todo list.
5) You cannot add 2 same todos in a single channel but if a todo is marked done, then you can again add that todo.

<hr>

### Deployment

<hr>

Firstly paste these commands in your terminal
```sh
$ git clone https://github.com/guptahardik17/slack-slash-todos-bot.git
$ cd slack-slash-todos-bot/backend
$ npm install
$ npm start

OR

Download zip and extract, then get into the folder
```

Then in your phpmyadmin create new database with name "todoslackbot". Now import database file(i.e. todoslackbot.sql in directory database file) into your database. Then change credentials in backend/config/dbconn.js.

<hr>

If you are deploying it online, your project link will work well, but if you want to use this in your localhost then you will need a public link for port 5000.

### Setting up this project on localhost


1) Get ngrok from https://ngrok.com/
2) Now extract that downloaded file
3) Get into the folder
4) Type:
```sh
$ ./ngrok authtoken {PASTE_YOUR_AUTHENTICATION_TOKEN_HERE}
```
5) You may check how to use ngrok with the below command
```sh
$ ./ngrok help
```
6) Now write:
```sh
$ ./ngrok http 5000
```
7) Now you will get a different public link, which will forward all your request to localhost:5000.
8) This link will be used to configuring slash commands on slack.

