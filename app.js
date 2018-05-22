var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
var entries = [];
app.locals.entries = entries;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, Response) => Response.render('index'));

app.get('/new-entry', (request, Response) => Response.render('new-entry'));

app.post('/new-entry', (request, Response) => {
    if (!request.body.title || !request.body.body) {
        Response.status(400).send('las entradas deben trner un titulo y un nombre');
        return;
    }
    entries.push({
        title: request.body.title,
        body: request.body.body,
        created: new Date()
    });
    Response.redirect('/');
});
app.use((request, Response) => Response.status(404).render('404'));
http.createServer(app).listen(3000, () =>
    console.log('la aplicacon Guestbook esta corriendo en el puerto 3000')
);