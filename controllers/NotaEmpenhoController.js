const NotaEmpenho = require('../models/NotaEmpenho');
const ItemNota = require('../models/ItemNota');

class NotaEmpenhoController {
    // Método para adicionar uma nota com itens
    static async addNotaComItens(req, res) {
        try {
            const { num_nota_empenho, num_pregao, nome_orgao, local_da_entrega, data_cadastro, valor_total_nota, itens } = req.body;
            const usuario_id = req.usuario.id;  // Pega o usuario_id do token

            // Cria a nova nota de empenho
            const novaNota = await NotaEmpenho.create({
                num_nota_empenho,
                num_pregao,
                nome_orgao,
                local_da_entrega,
                data_cadastro,
                usuario_id,
                valor_total_nota
            });

            // Adiciona os itens associados à nota
            for (const item of itens) {
                await ItemNota.create({
                    nota_empenho_id: novaNota.id,
                    nome_item: item.nome_item,
                    quantidade_total: item.quantidade_total,
                    valor_total: item.valor_total
                });
            }

            // Retorna a resposta de sucesso com a nova nota criada
            return res.status(201).json({ message: 'Nota cadastrada com sucesso!', novaNota });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar nota', error: error.message });
        }
    }

    // Método para atualizar uma nota existente
    static async updateNota(req, res) {
        const { id } = req.params;
        const { 
            num_nota_empenho, 
            num_pregao, 
            nome_orgao, 
            local_da_entrega, 
            data_cadastro, 
            usuario_id, 
            valor_total_nota, 
            itens 
        } = req.body;
    
        try {
            // Busca a nota pela chave primária (id)
            const nota = await NotaEmpenho.findByPk(id);
            if (!nota) {
                return res.status(404).json({ message: 'Nota não encontrada' });
            }
    
            // Atualiza os dados da nota
            await nota.update({ 
                num_nota_empenho, 
                num_pregao, 
                nome_orgao, 
                local_da_entrega, 
                data_cadastro, 
                usuario_id, 
                valor_total_nota 
            });
    
            // Remove os itens antigos
            await ItemNota.destroy({ where: { nota_empenho_id: id } });
    
            // Adiciona os novos itens
            for (const item of itens) {
                await ItemNota.create({
                    nota_empenho_id: id,
                    nome_item: item.nome_item,
                    quantidade_total: item.quantidade_total,
                    valor_total: item.valor_total
                });
            }
    
            // Retorna a resposta de sucesso
            return res.status(200).json({ message: 'Nota atualizada com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar nota', error: error.message });
        }
    }
    

    // Método para excluir uma nota
    static async deleteNota(req, res) {
        const { id } = req.params;
    
        try {
            // Busca a nota pela chave primária (id)
            const nota = await NotaEmpenho.findByPk(id);
            if (!nota) {
                return res.status(404).json({ message: 'Nota não encontrada' });
            }
    
            // Deleta os itens associados à nota
            await ItemNota.destroy({ where: { nota_empenho_id: id } });
    
            // Deleta a nota
            await nota.destroy();
    
            // Retorna a resposta de sucesso
            return res.status(200).json({ message: 'Nota e itens removidos com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao remover nota e itens', error: error.message });
        }
    }
    

    // Método para listar todas as notas com seus itens
    static async listarNotas(req, res) {
        try {
            const notas = await NotaEmpenho.findAll();

            const notasComItens = await Promise.all(
                notas.map(async (nota) => {
                    const itens = await ItemNota.findAll({
                        where: { nota_empenho_id: nota.id },
                    });

                    return {
                        ...nota.toJSON(),
                        itens: itens.map((item) => ({
                            nome_item: item.nome_item,
                            quantidade_total: item.quantidade_total,
                            valor_total: item.valor_total,
                        })),
                    };
                })
            );

            return res.status(200).json(notasComItens);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar notas', error: error.message });
        }
    }

    // Método para obter detalhes de uma nota específica
    static async detalhesNota(req, res) {
        const { id } = req.params;

        try {
            const nota = await NotaEmpenho.findByPk(id, {
                include: [ItemNota]
            });
            if (!nota) {
                return res.status(404).json({ message: 'Nota não encontrada' });
            }
            return res.status(200).json(nota);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao obter detalhes da nota', error: error.message });
        }
    }
}

module.exports = NotaEmpenhoController;
