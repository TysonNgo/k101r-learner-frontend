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
			var exercises = [
				{id:1, title: 'Lesson 1'},
				{id:2, title: 'Lesson 2'},
				{id:3, title: 'Lesson 3'},
				{id:4, title: 'Lesson 4'},
				{id:5, title: 'Lesson 5'}
			]; break;
		case 'translate':
			var exercises = [
				{id:1, title: 'Lesson 1'}
			];
			break;
		case 'grammar': 
			var exercises = [
				{id:1, title: 'Lesson 1'}
			];
			break;
		default:
			res.status(400).send('Not found');
	}
	res.render('exercise/index', {
		category:req.params.exercise,
		exercises: exercises
	});
});

router.get('/notes/:id', (req, res) => {
	switch(req.params.id){
		case '1':
			res.render('mynotes/pronunication');
		case '2':
			res.render('mynotes/grammar');
		case '3':
			res.render('mynotes/vocabulary',{
				vocabulary: [
					{id:1, title: 'Lesson 1'},
					{id:2, title: 'Lesson 2'},
					{id:3, title: 'Lesson 3'},
					{id:4, title: 'Lesson 4'},
					{id:5, title: 'Lesson 5'}
				]
			});
		case '4':
			res.render('mynotes/numbers');
		default:
			res.status(400).send('Not found');
	}
});

router.get('/exercise/dictation/:id', (req,res) => {
	res.render('exercise/dictation', {
		id:req.params.id
	});
});

app.use('/', router);
app.listen(port);

console.log("API on port: "+ port);
