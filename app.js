const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config').createConfig();

//Models
const newsScheme = require('./models/news.scheme');

global.config = config;

app.env = env;
app.config = config;
app.name = config.app.name;
app.secret = config.secret;

const dbUrl = 'mongodb://' + (config.db.user ? config.db.user + ':' + config.db.password + '@' : '') + config.db.ip +
    (config.db.port ? ':' + config.db.port : '') + '/' + config.db.db +
    (config.db.cluster ? '?ssl=true&replicaSet=' + config.db.cluster + '&authSource=admin' : '');

//DB connection
mongoose.connection.openUri(dbUrl, { useNewUrlParser: true }, (err, response) => {
  if (err) {
  	return log.error('ERROR: connection to database.', err)
  }
  console.log('Connected to Database');
});

//Headers configurations
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS")
  next();
});

//Express module
require('./config/express')(app);

require('./modules/routes')(app, router);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

app.get('/', (req, res) => {
  return res.redirect('/home');
});

app.get('/home', async (req, res) => {
  const news = await newsScheme.find();

  res.render('home', { title : 'ACADEMY-CODE', data : news });
});
app.listen(config.port, () => console.log(`ACADEMY-CODE init in port:  ${config.port}!`))
