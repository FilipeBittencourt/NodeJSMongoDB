/* importar o mongoDB */
const mongo = require('mongodb');

const connMongoDB = () => {
	const banco = 'got';
	const server = 'localhost';
	const porta = 27017;
	const mongoParam = {};
	const serverParam = {};

	const db = new mongo.Db(banco, new mongo.Server(server, porta, mongoParam), serverParam);

	return db;
};

module.exports = function () {
	return connMongoDB;
}; 
