// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var cors = require('cors')
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://heroku_2fl0kwsw:scj0c2lo8eqro26dlq5a74ufer@ds019698.mlab.com:19698/heroku_2fl0kwsw', //'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'mymasterkey', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://nanoparsetest.herokuapp.com/Parse',  // Don't forget to change to https if needed
  
  javascriptKey: process.env.JAVASCRIPT_KEY || '',  //** add this line no need to set values, they will be overwritten by heroku config vars
  restAPIKey: process.env.REST_API_KEY || '', //** add this line
  dotNetKey: process.env.DOT_NET_KEY || '', //** add this line
  clientKey: process.env.CLIENT_KEY || '', //** add this line
  
  
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();
app.use(cors());

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site basil test work.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
