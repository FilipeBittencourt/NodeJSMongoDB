module.exports = function (application) {

    application.get('/noticias', (req, res) => {
        application.app.controllers.noticiaControllers.noticias(application, req, res);
    });

    application.get('/noticia', (req, res) => {
        application.app.controllers.noticiaControllers.noticia(application, req, res);

    });
};
