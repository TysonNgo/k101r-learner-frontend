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

router.get('/exercise/:exercise', (req, res) => {
	switch (req.params.exercise.toLowerCase()){
		case 'dictation':
		case 'translate':
		case 'grammar': break;
		default:
			res.status(400).send('Not found');
	}
	res.render('exercise/index', {
		category:req.params.exercise
	});
});

app.use('/', router);
app.listen(port);

console.log("API on port: "+ port);
