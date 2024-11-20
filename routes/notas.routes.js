const express = require('express');
const NotaEmpenhoController = require('../controllers/NotaEmpenhoController');
const router = express.Router();

// Rota para adicionar uma nova nota de empenho com itens
router.post('/addNotaComItens', NotaEmpenhoController.addNotaComItens);

// Rota para listar todas as notas de empenho
router.get('/notas', NotaEmpenhoController.listarNotas);

// Rota para obter detalhes de uma nota específica
router.get('/notas/:id', NotaEmpenhoController.detalhesNota);

// Rota para atualizar uma nota existente
router.put('/notas/:id', NotaEmpenhoController.updateNota);

// Rota para remover uma nota existente
router.delete('/notas/:id', NotaEmpenhoController.deleteNota);

module.exports = router;