var mysql = require('mysql');

var con = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'ec021_av2_musicfy'
};

function runQuery(query, callback) {
    var connection = mysql.createConnection(con);
    connection.connect();

    console.log(`Running query "${query}" in db`);

    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log(`Erro na query: ${err}`);
            return []
        } else {
            callback(rows);
        }
    });

    connection.end();
}

module.exports = {
    getMusicas: (callback) => {
        runQuery('SELECT * FROM musica;', callback);
    },
    listarGeneros: (callback) => {
        runQuery('SELECT * FROM genero;', callback);
    },
    getMusicasByGenero: (genero_id, callback) => {
        runQuery(`SELECT * FROM musica WHERE genero_id = ${genero_id};`, callback);
    }
}
