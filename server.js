var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Well Done you have successfully started the service!')
});

app.get('/getData', function (req, res) {
  res.send('{"name:"suraj"}')
});

app.listen(3005, function () {
  console.log('Example app listening on port 3005!')
});

