const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ItemEntrega extends Model {}

ItemEntrega.init({
    entrega_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Entregas', // Nome da tabela de referência
            key: 'id',        // Campo de referência
        },
        comment: 'ID da entrega associada a este item',
    },
    item_nota_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ItemNota', // Nome da tabela de referência
            key: 'id',
        },
        comment: 'ID do item na nota de empenho',
    },
    quantidade_entregue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, // Garante que seja pelo menos 1
        },
        comment: 'Quantidade entregue do item',
    },
}, {
    sequelize,
    modelName: 'ItemEntrega',
    timestamps: true, // Rastreia criação e atualização
    paranoid: true,   // Suporte para exclusão lógica
});

module.exports = ItemEntrega;
