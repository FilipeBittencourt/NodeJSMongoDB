const ObjectId = require('mongodb').ObjectID;

function jogoModel(connection) {
    this._connection = connection();
}

jogoModel.prototype.gerarParametros = function (usuario) {
    this._connection.open((err, mongoClient) => {
        if (err) {
            return err;
        }
        mongoClient.collection('jogo', (errMongo, collection) => {
            if (errMongo) {
                return errMongo;
            }
            collection.insert({
                usuario: usuario,
                moeda: 10,
                aldeao: 15,
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                temor: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });
            mongoClient.close();
        });
    });
};

jogoModel.prototype.iniciaJogo = function (usuario, callback) {
    this._connection.open((err, mongoClient) => {
        if (err) {
            return callback(err);
        }
        mongoClient.collection('jogo', (errMongo, collection) => {
            if (errMongo) {
                return callback(errMongo);
            }
            collection.find({ usuario: usuario }).toArray((errFind, arrayFind) => {
                if (errFind) {
                    callback(errFind);
                } else {
                    callback(null, arrayFind[0]);
                }
                mongoClient.close();
            });
        });
    });
    return callback;
};

jogoModel.prototype.acao = function (acao, callback) {
    this._connection.open((err, mongoClient) => {
        if (err) {
            return callback(err);
        }
        mongoClient.collection('acao', (errMongo, collection) => {
            if (errMongo) {
                return callback(errMongo);
            }
            const date = new Date();
            let tempo = null;
            switch (parseInt(acao.acao)) {
                case 1: tempo = 1 * 60 * 60000; break;
                case 2: tempo = 2 * 60 * 60000; break;
                case 3: tempo = 5 * 60 * 60000; break;
                case 4: tempo = 5 * 60 * 60000; break;
                default: tempo = 1 * 60 * 60000;
            }
            acao.acao_termina_em = parseInt((date.getTime() + tempo));

            collection.insert(acao, (errIsert, result) => {
                if (errIsert) {
                    return callback(errIsert);
                }
                mongoClient.collection("jogo", (err, collection) => {
                    let moedas = null;
                    switch (parseInt(acao.acao)) {
                        case 1: moedas = -2 * acao.quantidade; break;
                        case 2: moedas = -3 * acao.quantidade; break;
                        case 3: moedas = -1 * acao.quantidade; break;
                        case 4: moedas = -1 * acao.quantidade; break;
                    }
                    collection.update({ usuario: acao.usuario }, { $inc: { moeda: moedas } }, callback);
                    mongoClient.close();
                });
            });
        });
    });
    return callback;
};


jogoModel.prototype.pergaminhoBuscar = function (dados, callback) {
    this._connection.open((err, mongoClient) => {
        if (err) {
            return callback(err);
        }
        mongoClient.collection('acao', (errMongo, collection) => {
            if (errMongo) {
                return callback(errMongo);
            }
            collection.find({ usuario: dados.usuario }).toArray((errFind, arrayFind) => {
                if (errFind) {
                    callback(errFind);
                } else {
                    callback(null, arrayFind);
                }
                mongoClient.close();
            });
        });
    });
    return callback;
};



jogoModel.prototype.revogarAcao = function (_id, callback) {
    this._connection.open((err, mongoClient) => {
        if (err) {
            return callback(err);
        }
        mongoClient.collection('acao', (errMongo, collection) => {
            if (errMongo) {
                return callback(errMongo);
            }
            collection.remove({ _id: ObjectId(_id) }, (err, result) => {
                
                if (err) {
                    callback(err);
                } else {
                    callback(null, result);
                }
            });
            mongoClient.close();
        });
    });
    return callback;
};

module.exports = function () {
    return jogoModel;
};
