const NotaEmpenho = require('../models/NotaEmpenho');
const ItemNota = require('../models/ItemNota');
const Entrega = require('../models/entrega'); // Modelo de Entrega
const ItemEntrega = require('../models/itemEntrega'); // Modelo de ItemEntrega
const sequelize = require('../config/database'); // Configuração do Sequelize

class EntregaController {
    // Método para cadastrar uma entrega
    static async addEntrega(req, res) {
        const t = await sequelize.transaction();
        try {
            const { nota_empenho_id, data_entrega, usuario_id, local_entrega, orgao, itens_entregues } = req.body;

            // Validações básicas
            if (!nota_empenho_id || !data_entrega || !usuario_id || !local_entrega || !orgao || !Array.isArray(itens_entregues)) {
                return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser fornecidos.' });
            }

            // Cria o registro da entrega
            const novaEntrega = await Entrega.create({
                nota_empenho_id,
                data_entrega,
                usuario_id,
                local_entrega,
                orgao,
            }, { transaction: t });

            // Adiciona os itens entregues
            const itensCriados = [];
            for (const item of itens_entregues) {
                if (!item.item_nota_id || !item.quantidade_entregue) {
                    await t.rollback();
                    return res.status(400).json({ message: 'Itens entregues devem conter item_nota_id e quantidade_entregue.' });
                }
                const novoItem = await ItemEntrega.create({
                    entrega_id: novaEntrega.id,
                    item_nota_id: item.item_nota_id,
                    quantidade_entregue: item.quantidade_entregue,
                }, { transaction: t });
                itensCriados.push(novoItem);
            }

            await t.commit();
            return res.status(201).json({
                message: 'Entrega cadastrada com sucesso!',
                entrega: novaEntrega,
                itens_entregues: itensCriados,
            });
        } catch (error) {
            await t.rollback();
            return res.status(500).json({ message: 'Erro ao cadastrar entrega', error: error.message });
        }
    }

    // Método para buscar todas as entregas
    static async buscarEntregas(req, res) {
        try {
            const entregas = await Entrega.findAll(); // Exemplo de busca de todas as entregas
            return res.status(200).json(entregas);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar entregas', error });
        }
    }

    // Método para buscar uma entrega por ID
    static async buscarEntregaPorId(req, res) {
        const { id } = req.params;
        try {
            const entrega = await Entrega.findByPk(id); // Busca a entrega pelo ID
            if (!entrega) {
                return res.status(404).json({ message: 'Entrega não encontrada' });
            }
            return res.status(200).json(entrega);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar entrega', error });
        }
    }

    // Método para atualizar uma entrega
    static async atualizarEntrega(req, res) {
        const { id } = req.params;
        const { nota_empenho_id, data_entrega, usuario_id, local_entrega, orgao, itens_entregues } = req.body;

        const t = await sequelize.transaction();
        try {
            // Verifica se a entrega existe
            const entrega = await Entrega.findByPk(id);
            if (!entrega) {
                return res.status(404).json({ message: 'Entrega não encontrada' });
            }

            // Atualiza os dados da entrega
            await entrega.update({
                nota_empenho_id,
                data_entrega,
                usuario_id,
                local_entrega,
                orgao,
            }, { transaction: t });

            // Aqui você pode adicionar lógica para atualizar os itens entregues, se necessário

            await t.commit();
            return res.status(200).json({ message: 'Entrega atualizada com sucesso!', entrega });
        } catch (error) {
            await t.rollback();
            return res.status(500).json({ message: 'Erro ao atualizar entrega', error });
        }
    }

    // Método para deletar uma entrega
    static async deletarEntrega(req, res) {
        const { id } = req.params;
        const t = await sequelize.transaction();
        try {
            // Verifica se a entrega existe
            const entrega = await Entrega.findByPk(id);
            if (!entrega) {
                return res.status(404).json({ message: 'Entrega não encontrada' });
            }

            // Deleta a entrega
            await entrega.destroy({ transaction: t });
            await t.commit();
            return res.status(200).json({ message: 'Entrega deletada com sucesso!' });
        } catch (error) {
            await t.rollback();
            return res.status(500).json({ message: 'Erro ao deletar entrega', error });
        }
    }

    // Outros métodos...
}

module.exports = EntregaController;
