module.exports.aldeaoView = function (application, req, res) {
    res.render('aldeaoView', { validacao: {} });
};
module.exports.ordenarAcaoAldeaoController = function (application, req, res) {
    req.assert('acao', 'Ação deve ser informada.').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();
    if (req.validationErrors()) {
        res.redirect('jogo?error');
        return;
    }
    console.log(req.body);
    res.send('Tudo ok');

    /*
    const connection = application.config.dbConnection;
    const usuarioModel = new application.app.models.usuarioModel(connection);
    const jogoModel = new application.app.models.jogoModel(connection);
    usuarioModel.inserirUsuario(req.body);
    jogoModel.gerarParametros(req.body.usuario);
    res.redirect('/');*/
};
