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
    usuarioModel.inserirUsuario(req.body);

    res.send('podemos cadastrar');

    /*
    req.assert('senha', 'Senha deve conter entre 10 e 100 caracteres').len(10, 100);    
    req.assert('data_noticia', 'Data é obrigatório').notEmpty().isDate({ format: 'YYYY-MM-DD' });
    req.assert('noticias', 'Noticias é obrigatório').notEmpty();
 
    if (req.validationErrors()) {
        res.render('admin/formulario_inclusao_noticia',
            { validacao: req.validationErrors(), noticia: noticia });
        return;
    }
    */
};
