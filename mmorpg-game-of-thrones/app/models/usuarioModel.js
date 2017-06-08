function usuarioModel() {
    const self = {};
    self.add({
        name: {
            type: String,
            required: true
        },
        usuario: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    });

    return self;
}

usuarioModel.prototype.usuario = function (usuario) {
    return usuario;
};

module.exports = function () {
    return usuarioModel;
};
