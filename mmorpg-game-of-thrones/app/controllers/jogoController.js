module.exports.jogoView = function (application, req, res) {
    if (req.session.autorizado) {
        const connection = application.config.dbConnection;
        const jogoModel = new application.app.models.jogoModel(connection);
        jogoModel.iniciaJogo(req.session.usuario, (err, result) => {
            if (err) {
                res.redirect('/');
                return;
            }
            if (req.query.msg !== undefined) {
                res.render('jogoView', { user: req.session, jogo: result, msg: req.query.msg });
                return;
            }           
            res.render('jogoView', { user: req.session, jogo: result, msg: '' });
        });
    } else {
        res.redirect('/');
        return;
    }
};
