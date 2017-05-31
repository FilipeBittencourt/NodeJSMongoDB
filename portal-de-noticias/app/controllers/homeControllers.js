module.exports.index = function (application, req, res) {
    const connection = application.config.dbConnection();
    const noticiasModel = new application.app.models.NoticiasDAO(connection);
    noticiasModel.getCincoUltimasNocticas((error, result) => {
        if (error) {
            res.render('home/index', { noticias: {} });
        }
        res.render('home/index', { noticias: result });
    });
};
