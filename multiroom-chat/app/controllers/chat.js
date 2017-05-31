module.exports.iniciaChat = function (application, req, res) {
    req.assert('apelido', 'Apelido ou nome obrigatório').notEmpty();
    req.assert('apelido', 'Apelido ou nome deve conter entre 3 e 15 caracteres').len(3, 15);
    if (req.validationErrors()) {
        res.render("index", {validaco: req.validationErrors()});
        return;
    }
    res.render("chat");
};
