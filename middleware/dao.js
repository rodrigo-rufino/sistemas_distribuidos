var mysql = require('mysql');

var con = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'ec021_av2_musicfy'
};

function run_query(query, callback) {
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
    test: (callback) => {
        run_query('SELECT * FROM musica;', callback);
    }
}
