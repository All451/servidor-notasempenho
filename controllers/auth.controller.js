const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ mensagem: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Senha inválida' });
        }

        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

exports.registrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        const usuario = await Usuario.create({
            nome,
            email,
            senha // A senha será criptografada no hook do modelo
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
};

exports.perfilUsuario = async (req, res) => {
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
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;  // ID do usuário a ser excluído
  
    try {
      // Tenta encontrar o usuário pelo ID
      const usuario = await Usuario.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }
  
      // Deleta o usuário
      await usuario.destroy();
  
      res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao excluir o usuário', erro: error.message });
    }
};
  