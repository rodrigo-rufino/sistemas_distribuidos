var restify = require('restify');
var dao = require('./dao');
var corsMiddleware = require('restify-cors-middleware');

const default_db_res = res => res_text => res.send(res_text);

function inserir(req, res, next) {
	const toddy = {
		lote: req.body.lote,
		conteudo: req.body.conteudo,
		validade: req.body.validade
	};

	console.log(`[inserir] Created toddy: ${JSON.stringify(toddy)}`);

	dao.inserir(toddy, default_db_res(res));
	next();
}

function atualizar(req, res, next) {
	const _id = req.query.id;
	const toddy = {
		lote: req.body.lote,
		conteudo: req.body.conteudo,
		validade: req.body.validade
	}

	dao.atualizar(_id, toddy, default_db_res(res));
	next();
}

function listar(req, res, next) {
	const _id = req.query.id;
	const _vencidos = req.query.vencidos === 'true';
	const has_vencidos = req.query.vencidos !== undefined;
	const _lote = req.query.lote;

	dao.listar(_id, _vencidos, has_vencidos, _lote, default_db_res(res));
	next();
}

function listarLotes(req, res, next) {
	dao.listarLotes(default_db_res(res));
	next();
}

function excluir(req, res, next) {
	const _id = req.query.id;

	if (_id === undefined) {
		res.send("Você precisa especificar o ID a ser apagado");
	} else {
		dao.excluir(_id, default_db_res(res));
	}
	next();
}

var server = restify.createServer({ name: 'EC021 - Prática 2' });

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

const cors = corsMiddleware({
	origins: ["*"],
	allowHeaders: ["API-Token"],
	exposeHeaders: ["API-Token-Expiry"]
});

server.pre(cors.preflight);
server.use(cors.actual);

var toddyPoint = '/toddy';
server.post(toddyPoint + '/salvar', inserir);
server.put(toddyPoint + '/salvar', atualizar);
server.get(toddyPoint + '/listar', listar);
server.get(toddyPoint + '/listarLotes', listarLotes);
server.del(toddyPoint + '/excluir', excluir);

const PORT = 5000;

server.listen(PORT, function () {
	console.log(`${server.name} rodando na porta ${PORT}`);
});
