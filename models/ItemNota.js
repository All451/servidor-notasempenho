const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ItemNota extends Model {}

ItemNota.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nota_empenho_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'notas_empenho',
            key: 'id'
        }
    },
    nome_item: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    quantidade_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'ItemNota',
    tableName: 'itens_nota',
    timestamps: true,
});

module.exports = ItemNota; 