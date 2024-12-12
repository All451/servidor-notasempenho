const express = require('express');
const NotaEmpenhoController = require('../controllers/NotaEmpenhoController');
const { authMiddleware } = require('../middlewares/auth.middleware'); // Importando o middleware
const router = express.Router();

// Rota POST para adicionar uma nova nota de empenho com itens
// A validação do token de autenticação é feita antes de chamar a função do controlador
router.post('/addNotaComItens', authMiddleware, NotaEmpenhoController.addNotaComItens);

// Detalhes da nota
router.get('/list-note/:id', NotaEmpenhoController.detalhesNota);  
// Atualiza a nota
router.put('/update/:id', NotaEmpenhoController.updateNota);  
// Deleta a nota
router.delete('/delete/:id', NotaEmpenhoController.deleteNota);  

module.exports = router;
