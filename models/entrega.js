const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Entrega = sequelize.define('Entrega', {
    nota_empenho_id: { type: DataTypes.INTEGER, allowNull: false },
    data_entrega: { type: DataTypes.DATEONLY, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    local_entrega: { type: DataTypes.STRING, allowNull: false }, // Novo campo
    orgao: { type: DataTypes.STRING, allowNull: false }, // Novo campo
});

module.exports = Entrega;
