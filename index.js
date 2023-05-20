const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const routes = require('./routes');

dotenv.config();

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
