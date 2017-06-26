module.exports.providerControler = function (application, req, res, callback) {
    return callback(null, { msg: 'Hi provider!' });
};
