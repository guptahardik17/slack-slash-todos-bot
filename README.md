# Slack-Slash-Todos-Bot

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
