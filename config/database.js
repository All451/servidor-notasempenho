const { Sequelize } = require('sequelize');
const path = require('path');

// Configuração do Sequelize para SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH || path.join(__dirname, '../config/database.sqlite'), // Utiliza variável de ambiente para o caminho
    logging: false, // Desativa logs de SQL, opcional
});

module.exports = sequelize;
