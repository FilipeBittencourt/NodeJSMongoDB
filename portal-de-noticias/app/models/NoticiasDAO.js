
function NoticiasDAO(connection) {
    this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function (callback) {
    this._connection.query('select * from noticias order by data_criacao desc;', callback);
    this._connection.end();
};

NoticiasDAO.prototype.getCincoUltimasNocticas = function (callback) {
    this._connection.query('select * from noticias order by data_criacao desc limit 5;', callback);
    this._connection.end();
};

NoticiasDAO.prototype.getNoticia = function (id, callback) {
    this._connection.query(`select * from noticias where id = ${id.id};`, callback);
    this._connection.end();
};

NoticiasDAO.prototype.salvarNoticias = function (noticia, callback) {
    this._connection.query('insert into noticias set ?', noticia, callback);
    this._connection.end();
};


module.exports = function () {
    return NoticiasDAO;
};
