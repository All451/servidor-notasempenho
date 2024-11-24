const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  // Inicialize os modelos com sequelize
  const Entrega = require('./Entrega')(sequelize, Sequelize.DataTypes);
  const ItemEntrega = require('./ItemEntrega')(sequelize, Sequelize.DataTypes);
  const NotaEmpenho = require('./NotaEmpenho')(sequelize, Sequelize.DataTypes);
  const Usuario = require('./Usuario')(sequelize, Sequelize.DataTypes);
  const ItensNota = require('./ItensNota')(sequelize, Sequelize.DataTypes);
  
  // Relacionamentos
  Entrega.hasMany(ItemEntrega, { foreignKey: 'entrega_id' });
  ItemEntrega.belongsTo(Entrega, { foreignKey: 'entrega_id' });

  NotaEmpenho.hasMany(Entrega, { foreignKey: 'nota_empenho_id' });
  Entrega.belongsTo(NotaEmpenho, { foreignKey: 'nota_empenho_id' });

  Usuario.hasMany(Entrega, { foreignKey: 'usuario_id' });
  Entrega.belongsTo(Usuario, { foreignKey: 'usuario_id' });

  ItensNota.hasMany(ItemEntrega, { foreignKey: 'item_nota_id' });
  ItemEntrega.belongsTo(ItensNota, { foreignKey: 'item_nota_id' });

  // Retorne os modelos ajustados
  return { Entrega, ItemEntrega, NotaEmpenho, Usuario, ItensNota };
};
