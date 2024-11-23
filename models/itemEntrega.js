const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ItemEntrega = sequelize.define('ItemEntrega', {
    entrega_id: { type: DataTypes.INTEGER, allowNull: false },
    item_nota_id: { type: DataTypes.INTEGER, allowNull: false },
    quantidade_entregue: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = ItemEntrega;
