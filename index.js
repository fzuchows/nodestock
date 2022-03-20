// Stock Market Portfolio App
// Credit: John Elder, PacktPub, Build a Stock Market App with Node
// Soure: https://github.com/flatplanet/nodestock
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
// get the port form the system env. OR hard-coded for testing
const PORT = process.env.PORT || 5555;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// Call Stock API to retrieve Stock info with
// API Key iexcloud.io: pk_5890a6d306c24f118f65c546bf20d7da
// https://cloud.iexapis.com/stable/stock/aapl/quote?token=YOUR_TOKEN_HERE
function callStockApi(finishedApi, stocksymb) {
  request('https://cloud.iexapis.com/stable/stock/' + stocksymb + '/quote?token=pk_5890a6d306c24f118f65c546bf20d7da', {json:true}, (err,res, body) => {
    if(err) {return console.log(err);}
    if(res.statusCode===200) {
      finishedApi(body);
    }
  });
};

// Set handlebars middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Set handlebar GET index routes
//app.get('/', function(req, res) {
app.get('/', (req, res) => {
  callStockApi(function(doneApi) {
    res.render('home', {
      stockinfo: doneApi
    });
  });
});

// Set handlebar POST index routes
//app.get('/', function(req, res) {
app.post('/', (req, res) => {
  callStockApi(function(doneApi) {
    //posted_stuff = req.body.stock_ticker;
    res.render('home', {
      stockinfo: doneApi
    });
  }, req.body.stock_ticker);
});

//app.get('/', function(req, res) {
app.get('/about.html', (req, res) => {
  res.render('about');
});

// Set folder for static content 
app.use(express.static(path.join(__dirname,'public')));

// Start node: node index.js
app.listen(PORT, () => console.log('Server listening on port: ' + PORT));