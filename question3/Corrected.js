//for the sake of best practice(To the best of my knowledge), i modified the pattern of declearations 

const express = require('express'), //added missing quotation to (express)
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      http = require('http');

/**
 * Assume that these are error free.
 */
const User = require('./models/user');
const logger = require('./utils/logger');

const mongoDB = process.env.MONGO_URI;

const app = express();

mongoose.connect(mongoDB, { useMongoClient: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

app.use(bodyParser.json());

// handler to save user
app.get('/save', function(req, res) {       //corrected  the order in which res and req appers as the callback function parameters
  const user = new User(user);

  user.save(function(err) {
    if (err) {
      res.status(500).send(err);
      return logger.log(err);             
    }
  });

  res.status(200).send('success');

  return res.json(user);
});

const server = http.createServer(app);

server.listen(80, function() {
  db.on('error', function(error) {
    logger.log(error);
  });
});