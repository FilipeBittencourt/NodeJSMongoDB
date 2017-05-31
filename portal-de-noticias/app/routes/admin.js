module.exports = function (application) {
    application.get('/formulario_inclusao_noticia', (req, res) => {
        application.app.controllers.adminControllers.formulario_inclusao_noticia(application, req, res);
    });

    application.post('/noticias/salvar', (req, res) => {
        application.app.controllers.adminControllers.noticias_salvar(application, req, res);
    });
};



