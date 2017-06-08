module.exports = function (application) {
    application.get('/cadastro', function (req, res) {
        application.app.controllers.cadastroController.cadastroView(application, req, res);
        //res.render('cadastro');
    });

    application.post('/cadastrar', function (req, res) {
        application.app.controllers.cadastroController.cadastrarView(application, req, res);
        //res.render('cadastro');
    });
};