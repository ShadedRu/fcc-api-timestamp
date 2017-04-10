var express = require('express');
var url = require('url');
var app = express();
var port = 8080;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/*', function (req, res) {
  var query = req.url.toString().slice(1);
  var isNum = /^\d+$/.test(query);
  if (isNum) {
    res.end(JSON.stringify(format(query*1000)));
  } else {
    var date = new Date(query.replace(/%20/g, ' '));
    if (date != 'Invalid Date') {
      res.end(JSON.stringify(format(date.getTime())));
    } else {
      res.end(JSON.stringify({unix:null, natural:null}));
    }
  }
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + "!");
});

function format (input) {
  var date = new Date(parseInt(input));
  var monthName = ['Janury', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August',
                  'September', 'October', 'November', 'December'];

  var unix_time = Math.floor(date.getTime() / 1000);
  var natural = monthName[date.getMonth()].toString() +
                ' ' + date.getDate().toString() +
                ', ' + date.getFullYear().toString();
  
  return {unix: unix_time, natural: natural};
}