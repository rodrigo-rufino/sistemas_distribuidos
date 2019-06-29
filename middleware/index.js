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

// server.use(restify.CORS({

// 	// Defaults to ['*'].
// 	origins: ['*'], 
  
// 	// Defaults to false.
// 	credentials: false,
  
// 	// Sets expose-headers.
// 	headers: ['Access-Control-Allow-Origin']   
  
//   }));

// server.use(
// 	function crossOrigin(req,res,next){
// 	  res.header("Access-Control-Allow-Origin", "*");
// 	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	  return next();
// 	}
//   );

server.get('/', (req, res, next) => {
	res.send('hello world');
	next();
});

server.get('/get_musicas', (req, res, next) => {
	dao.getMusicas((data) => res.send(data));
	next();
});

server.get('/musicfy/listarGenero', (req, res, next) => {
	console.log(`listando genero`);
	dao.listarGeneros((data) => {
		console.log(`results: ${JSON.stringify(data)}`);
		res.json(data)
	});
	next();
});

server.get('/musicfy/buscarMusicaPorGenero', (req, res, next) => {
	const genero_id = req.query.genero_id;
	console.log(`buscando musicas do id: ${genero_id}`);
	
	if (genero_id === undefined) {
		res.send(`undefined genero id`);
	} else {
		dao.getMusicasByGenero(genero_id, (data) => {
			console.log(`got musicas: ${JSON.stringify(data)}`);
			res.json(data)
		});
	}

	next();
});

const PORT = 5000;

server.listen(PORT, function () {
	console.log(`${server.name} rodando na porta ${PORT}`);
});
