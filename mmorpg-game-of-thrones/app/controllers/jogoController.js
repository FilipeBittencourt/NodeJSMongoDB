module.exports.jogoView = function (application, req, res) {
    if (req.session.autorizado) {
        const connection = application.config.dbConnection;
        const jogoModel = new application.app.models.jogoModel(connection);
        jogoModel.iniciaJogo(req.session.usuario, (err, result) => {
            if (err) {
                res.render('indexView', { validacao: err });
            }
            res.render('jogoView', { validacao: result });
        });
    } else {
        res.redirect('/');
    }
};
