var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    multypart = require('connect-multiparty'),
    fs = require('fs'),
    objectId = require('mongodb').ObjectId;

var app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multypart()); // serve para fazer upload de arquivos

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

var port = 3005;

app.listen(port);

var db = new mongodb.Db(
    'instagram',
    new mongodb.Server('localhost', 27017, {}),
    {}
);

console.log('Servidor HTTP esta escutando na porta ' + port);

app.get('/', function (req, res) {
    res.send({ msg: 'Olá' });
});

//POST (create)
app.post('/api', function (req, res) {
    const gId = guid();
    const pathOrigem = req.files.arquivo.path;
    const pathDestino = './upload/' + gId + '-' + req.files.arquivo.originalFilename;
    const urlImagem = gId + '-' + req.files.arquivo.originalFilename;
    fs.rename(pathOrigem, pathDestino, (err) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
    });
    const dados = {
        urlImagem: urlImagem,
        titulo: req.body.titulo
    };
    db.open(function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.insert(dados, function (err, records) {
                if (err) {
                    res.json({ 'status': 'erro' });
                } else {
                    res.json({ 'status': 'inclusao realizada com sucesso' });
                }
                mongoclient.close();
            });
        });
    });

});

app.get('/imagens/:imagens', function (req, res) {
    fs.readFile('./upload/' + req.params.imagens, (err, conteudo) => {
        if (err) {
            res.status(400).json({ error: err });
            return;
        }
        res.writeHead(200, { 'content-type': 'image/jpg', 'content-type': 'image/jpeg', 'content-type': 'image/png' })
        res.end(conteudo);
    });
});

//GET (ready)
app.get('/api', function (req, res) {
    db.open(function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.find().toArray(function (err, results) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(results);
                }
                mongoclient.close();
            });
        });
    });

});


//GET by ID (ready)
app.get('/api/:id', function (req, res) {
    db.open(function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.find(objectId(req.params.id)).toArray(function (err, results) {
                if (err) {
                    res.json(err);
                } else {
                    res.status(200).json(results);
                }
                mongoclient.close();
            });
        });
    });
});






//PUT by ID (update)
app.put('/api/:id', function (req, res) {
    db.open(function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.update(
                { _id: objectId(req.params.id) },
                {
                    $push: {
                        comentarios: {
                            id_comentario: new objectId(),
                            comentario: req.body.comentario
                        }
                    }
                },
                {},
                function (err, records) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(records);
                    }

                    mongoclient.close();
                }
            );
        });
    });
});


//DELETE by ID (remover)
app.delete('/api/:id', function (req, res) {
    db.open(function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.update(
                {},
                {//remove elementos de um array com critérios passados
                    $pull: {
                        comentarios: {
                            id_comentario: objectId(req.params.id)
                        }
                    }
                },
                { multi: true },
                function (err, records) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(records);
                    }

                    mongoclient.close();
                }
            );
        });
    });
    /*db.open(function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.remove({ _id: objectId(req.params.id) }, function (err, records) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(records);
                }
                mongoclient.close();
            });
        });
    });*/
});

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
