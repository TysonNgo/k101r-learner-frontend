var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(__dirname + '/static'));

var port = process.env.PORT || 8080;
var router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
});

app.use('/', router);
app.listen(port);

console.log("API on port: "+ port);
