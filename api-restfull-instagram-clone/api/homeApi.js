module.exports = function (application) {
    application.post('/api/home', (req, res) => {        
        res.send(req.body);
        /*
        application.src.controller.homeController.homeController(application, req, res, (err, result) => {
            if (err) {
                res.send(err);
                return;
            }
            res.send(result);
            return;
        });*/
    });
};
