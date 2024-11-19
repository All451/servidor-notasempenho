const Usuario = require('../models/usuario.model');

exports.criarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        return res.status(201).json({ 
            mensagem: "Usuário criado com sucesso", 
            usuario: {
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error('Erro:', error);
        return res.status(400).json({ erro: "Erro ao criar usuário" });
    }
};

exports.buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.buscarUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Implemente os outros métodos do controller...
res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
});

module.exports = {
    criarUsuario: exports.criarUsuario,
    buscarUsuarios: exports.buscarUsuarios,
    buscarUsuarioPorId: exports.buscarUsuarioPorId
}; 
