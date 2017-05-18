var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.set('view options', { basedir: __dirname})
app.use(express.static(__dirname + '/static'));

var port = process.env.PORT || 8080;
var router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/dictation', (req, res) => {
	res.render('dictation/index');
});

router.get('/translate', (req, res) => {
	res.render('translate');
});

router.get('/grammar', (req, res) => {
	res.render('grammar');
});

app.use('/', router);
app.listen(port);

console.log("API on port: "+ port);
