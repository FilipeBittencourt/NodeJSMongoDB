module.exports.iniciaChat = function (application, req, res) {
    req.assert('apelido', 'Apelido ou nome obrigatório').notEmpty();
    req.assert('apelido', 'Apelido ou nome deve conter entre 3 e 15 caracteres').len(3, 15);
    if (req.validationErrors()) {
        res.render("index", { validacao: req.validationErrors() });
        return;
    }
    application.get('io').emit(
        'msgParaCliente',
        {
            apelido: req.body.apelido,
            mensagem: 'acabou de entrar no chat'
        });
    res.render("chat", { dadosForm: req.body.apelido });
};
