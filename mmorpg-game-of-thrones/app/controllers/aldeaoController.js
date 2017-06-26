module.exports.aldeaoView = function (application, req, res) {
    res.render('aldeaoView', { validacao: {} });
};

module.exports.ordenarAcaoAldeaoController = function (application, req, res) {
    if (!req.session.autorizado) {
        res.send('Usuario não autenticado.');
        return;
    }
    req.assert('acao', 'Ação deve ser informada.').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();
    if (req.validationErrors()) {
        res.redirect('jogo?msg=error');
        return;
    }
    const connection = application.config.dbConnection;
    const jogoModel = new application.app.models.jogoModel(connection);
    const dados = req.body;
    dados.usuario = req.session.usuario;
    jogoModel.acao(dados, (err, result) => {
        if (err) {
            res.redirect('jogo?msg=error');
            return;
        }
        res.redirect('jogo?msg=sucesso');
        return;
    });
};



module.exports.revogarAcaoController = function (application, req, res) {
    if (!req.session.autorizado) {
        res.send('Usuario não autenticado.');
        return;
    }
    if (!req.query.id_acao) {
        res.send('Parametro não encontrado.');
        return;
    }

    const connection = application.config.dbConnection;
    const jogoModel = new application.app.models.jogoModel(connection);    
    jogoModel.revogarAcao(req.query.id_acao, (err, result) => {
        if (err) {
            //res.redirect('jogo?msg=error');
            console.log(err);
            return;
        }
        res.redirect('jogo?msg=acao');
        return;
    });
};

