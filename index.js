// Stock Market Portfolio App
// Credit: John Elder, PacktPub, Build a Stock Market App with Node
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5555;

// Set handlebars middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Set handlebar routes
//app.get('/', function(req, res) {
app.get('/', (req, res) => {
  res.render('home');
});

// Set folder for static content 
app.use(express.static(path.join(__dirname,'public')));

// Start node: node index.js
app.listen(PORT, () => console.log('Server listening on port: ' + PORT));