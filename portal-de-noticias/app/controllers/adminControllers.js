module.exports.formulario_inclusao_noticia = function (application, req, res) {
    res.render('admin/formulario_inclusao_noticia', { validacao: {}, noticia: {} });
};

module.exports.noticias_salvar = function (application, req, res) {
    const noticia = req.body;
    req.assert('titulo', 'Titulo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
    req.assert('autor', 'Autor é obrigatório').notEmpty();
    req.assert('data_noticia', 'Data é obrigatório').notEmpty().isDate({ format: 'YYYY-MM-DD' });
    req.assert('noticias', 'Noticias é obrigatório').notEmpty();

    if (req.validationErrors()) {
        res.render('admin/formulario_inclusao_noticia', { validacao: req.validationErrors(), noticia: noticia });
        return;
    }

    const connection = application.config.dbConnection();
    const noticiasModel = new application.app.models.NoticiasDAO(connection);
    noticiasModel.salvarNoticias(noticia, (error, result) => {
        if (error) {
            console.log(error);
        }

        res.redirect('/noticias');
    });
};
