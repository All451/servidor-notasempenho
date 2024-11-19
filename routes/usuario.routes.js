const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { authMiddleware } = require('../middlewares/auth.middleware');
const Usuario = require('../models/usuario.model');

router.post('/usuarios', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Verificar se usuário já existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        // Criptografar a senha
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha, salt);

        // Criar novo usuário
        const usuario = await Usuario.create({
            nome,
            email,
            senha: senhaCriptografada
        });

        res.status(201).json({
            mensagem: 'Usuário criado com sucesso',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar usuário' });
    }
});

router.get('/perfil', authMiddleware, async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id, {
            attributes: ['id', 'nome', 'email']
        });
        
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao buscar perfil' });
    }
});

module.exports = router; 