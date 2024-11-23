const express = require('express');
const entregaController = require('../controllers/entregaController');
const router = express.Router();

// Importando as funções do controlador
const { buscarEntregas, addEntrega, buscarEntregaPorId, atualizarEntrega, deletarEntrega } = entregaController;

// Rota para cadastrar uma nova entrega
router.post('/entregas', addEntrega);

// Rota para buscar todas as entregas
router.get('/entregas', buscarEntregas);

// Rota para buscar uma entrega específica por ID
router.get('/entregas/:id', buscarEntregaPorId);

// Rota para atualizar uma entrega existente
router.put('/entregas/:id', atualizarEntrega);

// Rota para deletar uma entrega
router.delete('/entregas/:id', deletarEntrega);

module.exports = router;