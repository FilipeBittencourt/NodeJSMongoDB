module.exports.jogoView = function (application, req, res) {
    if (req.session.autorizado) {
        const connection = application.config.dbConnection;
        const jogoModel = new application.app.models.jogoModel(connection);
        jogoModel.iniciaJogo(req.session.usuario, (err, result) => {
            if (err) {
                res.redirect('/');
                return;
            }
            if (req.query.error !== undefined) {
                res.render('jogoView', { user: req.session, jogo: result, error: 'true' });
                return;
            }
            res.render('jogoView', { user: req.session, jogo: result, error: 'false' });
            return;
        });
    } else {
        res.redirect('/');
        return;
    }
};
