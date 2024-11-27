const express = require('express');
const { body, validationResult } = require('express-validator');
const { login, registrarUsuario, perfilUsuario } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/registrar', 
    body('email').isEmail().withMessage('E-mail inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }
        next();
    },
    registrarUsuario
);

router.post('/login', login);

router.get('/perfil', authMiddleware, perfilUsuario);

module.exports = router;
