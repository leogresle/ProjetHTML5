var express = require('express');
var app = express();
 
app.get('/accueil', function(req, res) {
  res.sendFile(__dirname + "/Calendier.html");
});
 
app.get('/autre', function(req, res) {
  res.sendFile(__dirname + "/Edit.html");
});
 
app.listen(8000);
console.log("App listening on port 8000...");