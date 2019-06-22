var mongojs = require('mongojs');

var db = mongojs('mongo:27017/aula', ['toddy']);

const o_id = mongojs.ObjectID;
const base_filter = get_attr => fix_attr => compareTo => f => res => f(fix_attr(get_attr(res)), compareTo);

module.exports = {
    inserir: (toddy, callback) => {
        db.toddy.save(toddy, (err, results) => {
            if (err) {
                const err_text = `Error inserting:\n${err}`;
                console.log(err_text);
                callback(err_text);
            } else {
                const res_text = `Created object id: ${results._id}`;
                console.log(res_text);
                callback(res_text);
            }
        });
    },
    atualizar: (_id, toddy, callback) => {
        db.toddy.update({ _id: o_id(_id) }, { "$set": toddy }, (err, results) => {
            if (err) {
                const err_text = `Error updating:\n${err}`;
                console.log(err_text);
                callback(err_text);
            } else {
                callback(results);
            }
        });
    },
    listar: (_id, _vencidos, has_vencidos, _lote, callback) => {
        db.toddy.find(_id ? { _id: o_id(_id) } : {}, (error, results) => {
            if (error) {
                const error_text = `Error getting toddies:\n${error}`;
                console.log(error_text);
                callback(error_text);
            } else {
                if (has_vencidos) {
                    results = results.filter(base_filter(r => r.validade)
                        (d => new Date(d.split('/').reverse()))
                        (new Date())
                        ((d1, d2) => _vencidos ? d1 < d2 : d1 > d2));
                }
                if (_lote !== undefined) {
                    results = results.filter(r => r.lote === _lote);
                }
                callback(results);
            }
        });
    },
    listarLotes: callback => {
        db.toddy.distinct("lote", {}, (error, results) => {
            if (error) {
                const err_text = `Error getting lotes:\n${err}`;
                console.log(err_text);
                callback(err_text);
            } else {
                callback(results);
            }
        });
    },
    excluir: (_id, callback) => {
        db.toddy.remove({ _id: o_id(_id) }, function (error, results) {
			if (error) {
				const error_text = `Error deleting toddy ${_id}:\n${error}`;
				console.log(error_text);
				callback(error_text);
			} else {
				callback(results)
			}
		});
    }
}
