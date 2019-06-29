var restify = require('restify');
var dao = require('./dao');
var corsMiddleware = require('restify-cors-middleware');

var server = restify.createServer({ name: 'Prova 2' });

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

const cors = corsMiddleware({
	origins: ["*"],
	allowHeaders: ["API-Token"],
	exposeHeaders: ["API-Token-Expiry"]
});

server.pre(cors.preflight);
server.use(cors.actual);

server.get('/', (req, res, next) => {
	res.send('hello world');
	next();
});

server.get('/get_musicas', (req, res, next) => {
	dao.test((data) => res.send(data));
});

const PORT = 5000;

server.listen(PORT, function () {
	console.log(`${server.name} rodando na porta ${PORT}`);
});
