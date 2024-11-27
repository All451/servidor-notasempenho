const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Apenas essa linha é suficiente

const Entrega = sequelize.define('Entrega', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nota_empenho_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_entrega: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  local_entrega: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  orgao: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Entrega;
