const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class NotaEmpenho extends Model {}

NotaEmpenho.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    num_nota_empenho: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    num_pregao: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    nome_orgao: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    local_da_entrega: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    data_cadastro: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    valor_total_nota: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'NotaEmpenho',
    tableName: 'notas_empenho',
    timestamps: true,
});

module.exports = NotaEmpenho; 