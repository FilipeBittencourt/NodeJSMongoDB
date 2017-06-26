module.exports.clientController = function (application, req, res, callback) {
    return callback(null, { msg: 'Hi client!' });
};
