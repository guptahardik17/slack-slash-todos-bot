const express = require('express');
const router = express.Router();
const connection = require('../config/dbconn');

router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/api/addtodo', (req, res) => {

  console.log("Data Coming");
  console.log(req.body);
  var obj = req.body;

  obj.text = obj.text.replace("'", "''");

  var output = {
    "response_type": "in_channel",
    "text": "",
    "attachments": [{"text":""}]
  }

  if(obj.text==""){
    output.text = "Invalid Request";
    output.attachments[0].text = "Please add a todo name. (eg. /addtodo Create Game)";
    res.send(output);
  }
  else{
    connection.query("select todomessage,username from todo where teamid='"+obj.team_id+"' and channelid='"+obj.channel_id+"' and todomessage='"+obj.text+"' and status='pending';", function(err, rows){
      if (rows.length>0) {
        output.text = "This Todo is already in the channel's todo list.";
        output.attachments[0].text = "Added by: @"+ rows[0].username;
        res.send(output);
      }
      else {
        connection.query("insert into todo(teamid,teamdomain,channelid,channelname,userid,username,todomessage,status) values('"+obj.team_id+"','"+obj.team_domain+"','"+obj.channel_id+"','"+obj.channel_name+"','"+obj.user_id+"','"+obj.user_name+"','"+obj.text+"','pending');", function(err, rows){
          if (err) throw err;
          output.text = "Added TODO for '"+obj.text+"'";
          output.attachments[0].text = "This Todo has been added to the channel's TODOs list";
          res.send(output);
        });
      }
    });

  }
  console.log(output);
});

router.post('/api/listtodos', (req, res) => {

  console.log("Data Coming");
  console.log(req.body);
  var obj = req.body;
  obj.text = obj.text.replace("'", "''");
  var output = {
    "response_type": "in_channel",
    "text": "",
    "attachments": []
  }

  connection.query("select CONCAT(todomessage,', Added by @',username) as text from todo where teamid='"+obj.team_id+"' and channelid='"+obj.channel_id+"' and status='pending';", function(err, rows){
    if (rows.length>0) {
      output.text = "Below list is of todos which have not marked as completed";
      output.attachments = rows;
      res.send(output);
    }
    else {
      temp = {"text": "No TODOs"};
      output.attachments.push(temp);
      res.send(output);
    }
  });
  console.log(output);
});

router.post('/api/marktodo', (req, res) => {

  console.log("Data Coming");
  console.log(req.body);
  var obj = req.body;

  var output = {
    "response_type": "in_channel",
    "text": "",
    "attachments": [{"text":""}]
  }
  obj.text = obj.text.replace("'", "''");
  if(obj.text==""){
    output.text = "Invalid Request";
    output.attachments[0].text = "Please add a todo name. (eg. /marktodo Create Game)";
    res.send(output);
  }
  else{
    connection.query("select todomessage,username,status from todo where teamid='"+obj.team_id+"' and channelid='"+obj.channel_id+"' and todomessage='"+obj.text+"' and status='pending';", function(err, rows){
      if (rows.length>0) {
        connection.query("update todo set status='done' where teamid='"+obj.team_id+"' and channelid='"+obj.channel_id+"' and todomessage='"+obj.text+"';", function(err, rows){
          output.text = "Removed TODO for '"+obj.text+"'";
          output.attachments[0].text = "This TODO has been marked as done.";
          res.send(output);
        });
      }
      else {
        output.text = "TODO Not Found or Invalid";
        output.attachments[0].text = "This Todo is not in the pending todo's channel list.";
        res.send(output);
      }
    });
  }

  console.log(output);
});



module.exports = router;
