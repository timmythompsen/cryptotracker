const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI, options);




var options = {
  useMongoClient: true,
  autoIndex: false, 
  reconnectTries: Number.MAX_VALUE, 
  reconnectInterval: 500, 
  poolSize: 10, 
  bufferMaxEntries: 0
};

const app = express();

app.use(cookieSession({
	maxAge: 30*24*60*60*1000,
	keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);