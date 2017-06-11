module.exports.cadastroView = function (application, req, res) {
    res.render('cadastroView', { validacao: {}, dadosForm: {} });
};

module.exports.cadastrar = function (application, req, res) {
    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('usuario', 'Usuario é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatório').notEmpty();
    req.assert('casa', 'Casa é obrigatório').notEmpty();
    if (req.validationErrors()) {
        res.render('cadastroView', { validacao: req.validationErrors(), dadosForm: req.body });
        return;
    }

    const connection = application.config.dbConnection;
    const usuarioModel = new application.app.models.usuarioModel(connection);
    const jogoModel = new application.app.models.jogoModel(connection);    
    usuarioModel.inserirUsuario(req.body);
    jogoModel.gerarParametros(req.body.usuario);
    res.redirect('/');
};
