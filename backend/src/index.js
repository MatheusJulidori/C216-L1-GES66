const restify = require('restify');

var server = restify.createServer({
    name: 'pratica-2',
});

const defaultName = 'Matheus Julidori - GES66';

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.get('/api/v1/hello', function(req, res) {
    let name = defaultName;
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send('Hello ' + name);
});

server.get('/api/v1/params/:name', function(req, res, next) {
    let name = req.params.name;
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send('Parametro passado na rota: ' + name);
    next();
});

server.get('/api/v1/query', function(req, res) {
    let name = req.query.name;
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send('Query passado na requisição: ' + name);
});

server.post('/', function(req, res) {
    let name = defaultName;
    if(req.body){
        name = req.body.name;
    }
    res.setHeader('Content-Type', 'text/html');
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>HomePage Post Test</title>
        </head>
        <body>
            <h1>Obtendo o body da requisição: ${name} foi passado</h1>
        </body>
        </html>
    `;
    res.write(html);
    res.end();
})

server.get('/', function(req, res) {
    let name = defaultName;
    res.setHeader('Content-Type', 'text/html');
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Minha API com restify.js</title>
        </head>
        <body>
            <h1>Página HTML de ${name}</h1>
            <p>Esta página é apenas um exemplo</p>
        </body>
        </html>
    `;
    res.write(html);
    res.end();
})

// ============================= BONUS =============================
var repositorio = [];
server.post('/api/v1/add', function(req, res, next) {
    repositorio.push(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send(201, { message: 'Resource created' });
    next();
});
server.get('/api/v1/list', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send(repositorio);
    next();
});
server.del('/api/v1/list', function(req, res, next) {
    repositorio = [];
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send(200, { message: 'Resource deleted' });
    next();
});
// ============================= BONUS =============================

var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log('Server ', server.name, ' listening on http://localhost:' + port);
})