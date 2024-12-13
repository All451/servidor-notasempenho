const NotaEmpenho = require('../models/NotaEmpenho');
const ItemNota = require('../models/ItemNota');

class NotaEmpenhoController {
    // Método para adicionar uma nota com itens
    static async addNotaComItens(req, res) {
        try {
            const { num_nota_empenho, num_pregao, nome_orgao, local_da_entrega, data_cadastro, valor_total_nota, itens } = req.body;
            const usuario_id = req.usuario.id;

            // Criação da nova nota de empenho
            const novaNota = await NotaEmpenho.create({
                num_nota_empenho,
                num_pregao,
                nome_orgao,
                local_da_entrega,
                data_cadastro,
                usuario_id,
                valor_total_nota,
            });

            // Criação dos itens associados
            const itensCriados = itens.map(item => ({
                nota_empenho_id: novaNota.id,
                ...item,
            }));
            await ItemNota.bulkCreate(itensCriados);

            return res.status(201).json({ message: 'Nota cadastrada com sucesso!', novaNota });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar nota', error: error.message });
        }
    }

    // Método para atualizar uma nota existente
    static async updateNota(req, res) {
        try {
            const { id } = req.params;
            const { num_nota_empenho, num_pregao, nome_orgao, local_da_entrega, data_cadastro, usuario_id, valor_total_nota, itens } = req.body;

            const nota = await NotaEmpenho.findByPk(id);
            if (!nota) {
                return res.status(404).json({ message: 'Nota não encontrada' });
            }

            // Atualização da nota
            await nota.update({
                num_nota_empenho,
                num_pregao,
                nome_orgao,
                local_da_entrega,
                data_cadastro,
                usuario_id,
                valor_total_nota,
            });

            // Recriação dos itens
            await ItemNota.destroy({ where: { nota_empenho_id: id } });
            const itensAtualizados = itens.map(item => ({
                nota_empenho_id: id,
                ...item,
            }));
            await ItemNota.bulkCreate(itensAtualizados);

            return res.status(200).json({ message: 'Nota atualizada com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar nota', error: error.message });
        }
    }

    // Método para excluir uma nota
    static async deleteNota(req, res) {
        try {
            const { id } = req.params;

            const nota = await NotaEmpenho.findByPk(id);
            if (!nota) {
                return res.status(404).json({ message: 'Nota não encontrada' });
            }

            await ItemNota.destroy({ where: { nota_empenho_id: id } });
            await nota.destroy();

            return res.status(200).json({ message: 'Nota e itens removidos com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao remover nota e itens', error: error.message });
        }
    }

    // Método para listar todas as notas com seus itens
    // Método para listar as notas cadastradas pelo usuário autenticado
static async listarNotas(req, res) {
    try {
        const usuario_id = req.usuario.id; // Pega o usuário autenticado pelo token

        // Busca as notas cadastradas pelo usuário
        const notas = await NotaEmpenho.findAll({ where: { usuario_id } });

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
    // Método para obter detalhes de uma nota específica
    // Método para obter detalhes de uma nota específica
static async detalhesNota(req, res) {
    try {
        const { id } = req.params;
        const usuario_id = req.usuario.id; // Pega o ID do usuário autenticado

        // Busca a nota específica cadastrada pelo usuário
        const nota = await NotaEmpenho.findOne({
            where: { id, usuario_id }, // Filtra pela nota específica e usuário autenticado
        });

        if (!nota) {
            return res.status(404).json({ message: 'Nota não encontrada ou não pertence ao usuário' });
        }

        // Busca os itens associados à nota
        const itens = await ItemNota.findAll({
            where: { nota_empenho_id: id },
        });

        // Retorna a nota com seus itens
        const notaComItens = {
            ...nota.toJSON(),
            itens: itens.map((item) => ({
                nome_item: item.nome_item,
                quantidade_total: item.quantidade_total,
                valor_total: item.valor_total,
            })),
        };

        return res.status(200).json(notaComItens);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter detalhes da nota', error: error.message });
    }
}

}
module.exports = NotaEmpenhoController;
