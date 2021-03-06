const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config').createConfig();
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs');
var path = require('path');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/img/articles/')
  },
  filename: function (req, file, cb) {
    const type = file.mimetype.slice(6);
    const fieldname = Date.now().toString() + '.' + type;
    cb(null, fieldname)
  }
})
var upload = multer({ storage: storage })
const myCss = {
   style : fs.readFileSync('./assets/css/style.css','utf8'),
	 icons : fs.readFileSync('./assets/font-awesome/css/font-awesome.min.css','utf8'),
   script : fs.readFileSync('./assets/js/navbar.js','utf8'),
};
const template = require('./template.js').template;

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

// require('./modules/routes')(app, router);

app.set('views', 'views');
app.set('view engine', 'ejs');

//app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.static(path.join(__dirname, '/assets')));
app.use(express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended : false }));
app.use('/', router);

app.get('/', (req, res) => {
  return res.redirect('/home');
});

app.get('/about', (req, res) => {
  const tags = {
    title : 'Academy-Code: Tecnología y programación',
    description : 'Academy-Code es una compañía que nos dedicamos a los que más amamos, la programación.',
    url : 'http://www.academy-code.com/about',
    image : './assets/img/academy-logo.png'
  };
  return res.render('about', { success: true, myCss: myCss, tags : tags, title: 'Academy-Code: Acerca de nosotros', template : 'core/meta-tags'  });
});

app.get('/contact', (req, res) => {
  const tags = {
    title : 'Academy-Code: Tecnología y programación',
    description : 'Academy-Code está 24/7, al pendiente de nuestros usuarios.',
    url : 'http://www.academy-code.com/contact',
    image : './assets/img/academy-logo.png'
  };
  return res.render('contact', { success: true, myCss: myCss, tags : tags, title: 'Academy-Code: Contacto', template : 'core/meta-tags'  });
});

app.get('/admin/write-article', async (req, res) => {
  return res.render('admin/article', { article : new newsScheme() });
});

app.post('/admin/new-article', upload.single('imageHeader'), async (req, res) => {
  const tags = {
    title : 'Academy-Code: Tecnología y programación',
    description : 'Academy-Code es un sitio para aquellos amantes de la tecnología, y la programación.',
    url : 'http://www.academy-code.com/',
    image : './assets/img/academy-logo.png'
  };
  let obj = {
    title : req.body.title,
    description : req.body.description,
    body: req.body.resultEditor,
    imageHeader : 'http://academy-code.com/' + req.file.path,
    by : { id: ObjectId("5e94bf03cc5b9415a8b56195"), fullname : "JOAQUIN HERNANDEZ MARTINEZ" }
  };
  switch(req.body.category) {
    case '1':
      obj['category'] = {id:1, name:'Apple'};
    break;
    case '2':
      obj['category'] = {id:2, name:'Videojuegos'};
    break;
    case '3':
      obj['category'] = {id:3, name:'Móvil'};
    break;
    case '4':
      obj['category'] = {id:4, name:'Android'};
    break;
    case '5':
      obj['category'] = {id:5, name:'Computo'};
    break;
    case '6':
      obj['category'] = {id:6, name:'Desarrollo web'};
    break;
    case '7':
      obj['category'] = {id:7, name:'Desarrollo móvil'};
    break;
  }

  var model = new newsScheme(obj);
  model.save(function (err, response) {
		if (err) {
			return next(err);
		} else {
			return res.status(200).send({success:true});
		}
	});
  //return res.render('admin/article');
});

app.get('/article/get/:_id', async (req, res) => {
  let _id = req.params._id;

	newsScheme
		.findOne({ _id : ObjectId(_id) })
		.exec(function (err, response) {
			if (err) return next(err);

      if(response) {
        const tags = {
          title : response.title,
          description : response.description,
          url : 'http://www.academy-code.com/article/get/'+response._id,
          image : response.imageHeader
        };

        newsScheme
          .find({ 'category.id' : response.category.id, _id: { $ne: ObjectId(response._id) } })
          .sort({ creation_date : - 1 })
          .limit(3)
          .then((results) => {
            if(results) {
              if (err) return next(err);

              return res.render('article', { success: true, data: response, list: results, myCss: myCss, tags : tags, template : 'core/meta-tags'  });
            }
          });
      }

		});
});

app.get('/home', async (req, res) => {
  const news = await newsScheme.find().sort({creation_date:-1});
  const categories = await newsScheme.aggregate([{ $group: { _id : '$category.name', total : { $sum:1 } } }, { $sort : { _id : 1 } }]);
  const tags = {
    title : 'Academy-Code: Tecnología y programación',
    description : 'Academy-Code es un sitio para aquellos amantes de la tecnología, y la programación.',
    url : 'http://www.academy-code.com/',
    image : './assets/img/academy-logo.png'
  };

  res.render('home', { data : news, tags : tags, template : 'core/meta-tags', categories : categories  });
});
app.listen(config.port, () => console.log(`ACADEMY-CODE init in port:  ${config.port}!`))
