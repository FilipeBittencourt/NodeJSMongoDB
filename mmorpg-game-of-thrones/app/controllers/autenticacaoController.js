module.exports.autenticacaoController = function (application, req, res) {
    req.assert('usuario', 'Usuario é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatório').notEmpty();

    if (req.validationErrors()) {
        res.render('indexView', { validacao: req.validationErrors() });
        return;
    }
    const connection = application.config.dbConnection;
    const usuarioModel = new application.app.models.usuarioModel(connection);
    usuarioModel.autenticar(req.body, (err, result) => {
        if (err) {
            res.render('indexView', { validacao: err });
        } else {
            if (result.length > 0) {
                req.session.autorizado = true;
                req.session.usuario = result[0].usuario;
                req.session.casa = result[0].casa;
                res.redirect('jogo');
            } else {
               res.render('indexView', { validacao: [{ msg: `Usuario  '${req.body.usuario}' não está cadastrado.` }] });
               // res.redirect('/', { validacao: [{ msg: `Usuario  '${req.body.usuario}' não está cadastrado.` }] });
            }
        }
    });
};
