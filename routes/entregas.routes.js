const express = require('express');
const entregaController = require('../controllers/entregaController');
const { authMiddleware } = require('../middlewares/auth.middleware'); // Importando o middleware
const router = express.Router();

// Rota para cadastrar uma nova entrega com o middleware de autorização
router.post('/addEntrega', authMiddleware, entregaController.addEntrega);

// Rota para buscar todas as entregas
router.get('/entregas', authMiddleware, entregaController.buscarEntregas);

// Rota para buscar uma entrega específica por ID
router.get('/buscar-entrega/:id', authMiddleware, entregaController.buscarEntregaPorId);

// Rota para atualizar uma entrega existente
router.put('/atualizar-entrega/:id', authMiddleware, entregaController.atualizarEntrega);

// Rota para deletar uma entrega
router.delete('/deletar-entrega/:id', authMiddleware, entregaController.deletarEntrega);

module.exports = router;
