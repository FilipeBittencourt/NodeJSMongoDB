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

module.exports = function () {
    return jogoModel;
};
