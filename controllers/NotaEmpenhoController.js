const NotaEmpenho = require('../models/NotaEmpenho');
const ItemNota = require('../models/ItemNota');

class NotaEmpenhoController {
    static async addNotaComItens(req, res) {
        try {
            const { num_nota_empenho, num_pregao, nome_orgao, local_da_entrega, data_cadastro, usuario_id, valor_total_nota, itens } = req.body;

            const novaNota = await NotaEmpenho.create({
                num_nota_empenho,
                num_pregao,
                nome_orgao,
                local_da_entrega,
                data_cadastro,
                usuario_id,
                valor_total_nota
            });

            // Adiciona os itens
            for (const item of itens) {
                await ItemNota.create({
                    nota_empenho_id: novaNota.id,
                    nome_item: item.nome_item,
                    quantidade_total: item.quantidade_total,
                    valor_total: item.valor_total
                });
            }

            return res.status(201).json({ message: 'Nota cadastrada com sucesso!', novaNota });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar nota', error });
        }
    }

    static async updateNota(req, res) {
        const { id } = req.params;
        const { num_nota_empenho, num_pregao, nome_orgao, local_da_entrega, data_cadastro, itens } = req.body;

        try {
            const nota = await NotaEmpenho.findByPk(id);
            if (!nota) {
                return res.status(404).json({ message: 'Nota não encontrada' });
            }

            await nota.update({ num_nota_empenho, num_pregao, nome_orgao, local_da_entrega, data_cadastro });

            // Atualiza os itens (lógica simplificada)
            await ItemNota.destroy({ where: { nota_empenho_id: id } }); // Remove itens antigos
            for (const item of itens) {
                await ItemNota.create({
                    nota_empenho_id: id,
                    nome_item: item.nome_item,
                    quantidade_total: item.quantidade_total,
                    valor_total: item.valor_total
                });
            }

            return res.status(200).json({ message: 'Nota atualizada com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar nota', error });
        }
    }

    static async deleteNota(req, res) {
        const { id } = req.params;

        try {
            const nota = await NotaEmpenho.findByPk(id);
            if (!nota) {
                return res.status(404).json({ message: 'Nota não encontrada' });
            }

            await nota.destroy();
            return res.status(200).json({ message: 'Nota removida com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao remover nota', error });
        }
    }

    // Método para listar todas as notas de empenho com seus itens
    static async listarNotas(req, res) {
        try {
            const notas = await NotaEmpenho.findAll(); // Busca todas as notas

            // Inclui os itens de cada nota na estrutura do retorno
            const notasComItens = await Promise.all(
                notas.map(async (nota) => {
                    const itens = await ItemNota.findAll({
                        where: { nota_empenho_id: nota.id }, // Busca os itens associados a essa nota
                    });

                    return {
                        ...nota.toJSON(), // Converte a nota para JSON
                        itens: itens.map((item) => ({
                            nome_item: item.nome_item,
                            quantidade_total: item.quantidade_total,
                            valor_total: item.valor_total,
                        })), // Estrutura os itens no mesmo formato usado no cadastro
                    };
                })
            );

            return res.status(200).json(notasComItens);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar notas', error });
        }
    }

    // Método para obter detalhes de uma nota específica
    static async detalhesNota(req, res) {
        const { id } = req.params;

        try {
            const nota = await NotaEmpenho.findByPk(id, {
                include: [ItemNota] // Inclui os itens relacionados
            });
            if (!nota) {
                return res.status(404).json({ message: 'Nota não encontrada' });
            }
            return res.status(200).json(nota);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao obter detalhes da nota', error });
        }
    }
}

module.exports = NotaEmpenhoController; 