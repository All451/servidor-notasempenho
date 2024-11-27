const express = require('express');
const NotaEmpenhoController = require('../controllers/NotaEmpenhoController');
const { authMiddleware } = require('../middlewares/auth.middleware'); // Importando o middleware
const router = express.Router();

// Rota POST para adicionar uma nova nota de empenho com itens
// A validação do token de autenticação é feita antes de chamar a função do controlador
router.post('/addNotaComItens', authMiddleware, NotaEmpenhoController.addNotaComItens);

// Outras rotas
router.get('/notas/:id', NotaEmpenhoController.detalhesNota);  // Detalhes da nota
router.put('/notas/:id', NotaEmpenhoController.updateNota);  // Atualiza a nota
router.delete('/notas/:id', NotaEmpenhoController.deleteNota);  // Deleta a nota

module.exports = router;
