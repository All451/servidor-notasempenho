const express = require('express');
const NotaEmpenhoController = require('../controllers/NotaEmpenhoController');  // Certifique-se de importar corretamente
const router = express.Router();

// Rota POST para adicionar uma nova nota de empenho
router.post('/addNotaComItens', NotaEmpenhoController.addNotaComItens);  // Certifique-se de passar a função diretamente

// Outras rotas
router.get('/notas/:id', NotaEmpenhoController.detalhesNota);  // Detalhes da nota
router.put('/notas/:id', NotaEmpenhoController.updateNota);  // Atualiza a nota
router.delete('/notas/:id', NotaEmpenhoController.deleteNota);  // Deleta a nota

module.exports = router;
