var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var database;
 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connection URL 
var url = 'mongodb://localhost:27017/dopod';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  database = db;
  console.log("Connected correctly to server");
});

app.get("/mongoserv/getImageTypes", function (req, res) {
  var collection = database.collection('imagetypes');

  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs);
    res.send(docs);    
  });
});


app.get("/mongoserv/getStatus", function (req, res) {
  var collection = database.collection('status');

  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs);
    res.send(docs);    
  });
});

app.post("/mongoserv/setStatus", function (req, res) {
	var collection = database.collection('status');
	var reponame = req.body.reponame;
	var branch = req.body.branch;
	var type = req.body.type;
	var env = req.body.env;
	var imgname = req.body.imgname;
	var status = "running";
	//var status = req.body.status;
	var data = {"reponame":reponame,"branch":branch,"type":type,"env":env,"imgname":imgname,"status":status,"createddate":new Date()};
	console.log(JSON.stringify(data));
	
	collection.insertMany([data], function(err, result) {
    		if(err) console.log(err);
		if(result) console.log(result);
  	});

	console.log("Done");
	res.send("Done");
});


app.listen(3030, function () {
  console.log('Example app listening on port 3030!')
});

