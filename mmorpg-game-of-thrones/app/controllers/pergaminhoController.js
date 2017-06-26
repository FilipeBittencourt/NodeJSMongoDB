module.exports.pergaminhoBuscar = function (application, req, res) {
    if (!req.session) {
        res.send('Usuario não autenticado.');
        return;
    }
    const connection = application.config.dbConnection;
    const jogoModel = new application.app.models.jogoModel(connection);
    const dados = req.body;
    dados.usuario = req.session.usuario;
    jogoModel.pergaminhoBuscar(dados, (err, success) => {
        if (err) {
            res.redirect('jogo');
            return;
        }        
       
        res.render('pergaminhoView', { acoes: success });
        return;
    });
};
