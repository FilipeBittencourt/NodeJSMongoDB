function usuarioModel(connection) {
    this._connection = connection();
}

usuarioModel.prototype.inserirUsuario = function (usuario) {
    this._connection.open((err, mongoClient) => {
        if (err) {
            console.log(err);
            return err;
        }
        mongoClient.collection('usuario', (errMongo, collection) => {
            if (errMongo) {               
                return errMongo;
            }
            collection.insert(usuario);
            mongoClient.close();
        });
    });
};

usuarioModel.prototype.findUsuario = function (usuario, callback) {
    this._connection.open((err, mongoClient) => {
        if (err) {
            return callback(err);
        }
        mongoClient.collection('usuario', (errMongo, collection) => {
            if (errMongo) {
                return callback(errMongo);
            }
            collection.find(usuario).toArray((errFind, arrayUser) => {
                if (errFind) {
                    callback(errFind);
                } else {
                    callback(null, arrayUser);
                }
                mongoClient.close();
            });
        });
    });
    return callback;
};

module.exports = function () {
    return usuarioModel;
};
