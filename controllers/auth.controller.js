const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const NotaEmpenho = require('../models/NotaEmpenho')
const ItemNota  = require('../models/ItemNota');  // Certifique-se de importar seus modelos corretamente




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

exports.getUserInfo = async (req, res) => {
    try {
      // O ID pode vir do parâmetro da URL ou do token
      const userIdFromUrl = req.params.id;
      const userIdFromToken = req.usuario; // Extraído do middleware
  
      // Verifique se o ID do usuário foi passado corretamente
      console.log("User ID from URL:", userIdFromUrl);
      console.log("User ID from Token:", userIdFromToken);
  
      // Busque o usuário no banco de dados
      const user = await Usuario.findOne({
        where: { id: userIdFromUrl || userIdFromToken },
        attributes: { exclude: ['password'] }, // Exclui a senha do retorno
      });
      
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.deleteUser = async (req, res) => {
      const { id } = req.params;
  
      try {
          // Verifica se o modelo está definido
          if (!Usuario || !NotaEmpenho || !ItemNota) {
              return res.status(500).json({ mensagem: 'Modelos não definidos corretamente' });
          }
  
          // Tenta encontrar o usuário pelo ID
          const usuario = await Usuario.findByPk(id);
  
          if (!usuario) {
              return res.status(404).json({ mensagem: 'Usuário não encontrado' });
          }
  
          // Busca as notas vinculadas ao usuário
          const notas = await NotaEmpenho.findAll({ where: { usuario_id: id } });
          console.log('Notas encontradas:', notas);
  
          if (notas && notas.length > 0) {
              // Excluir os itens de cada nota antes de excluir as notas
              const notaIds = notas.map(nota => nota.id);
              await ItemNota.destroy({
                  where: { nota_empenho_id: notaIds }
              });
              console.log(`Itens das notas ${notaIds} excluídos`);
  
              // Agora exclua as notas vinculadas ao usuário
              await NotaEmpenho.destroy({
                  where: { usuario_id: id }
              });
              console.log(`Notas do usuário ${id} excluídas`);
          }
  
          // Deleta o usuário
          await usuario.destroy();
          console.log(`Usuário ${id} excluído`);
  
          res.status(200).json({ mensagem: 'Usuário e dados associados excluídos com sucesso' });
      } catch (error) {
          console.error('Erro durante a exclusão:', error);
          res.status(500).json({ 
              mensagem: 'Erro ao excluir o usuário', 
              erro: error.message 
          });
      }
  };
  

  exports.updateUser = async (req, res) => {
      const { id } = req.params; // Obtém o ID do usuário dos parâmetros da URL
      const { nome, email, senha } = req.body; // Obtém os dados para atualização do corpo da requisição
  
      try {
          // Verifica se o modelo está definido
          if (!Usuario) {
              return res.status(500).json({ mensagem: 'Modelo de usuário não definido corretamente' });
          }
  
          // Tenta encontrar o usuário pelo ID
          const usuario = await Usuario.findByPk(id);
  
          if (!usuario) {
              return res.status(404).json({ mensagem: 'Usuário não encontrado' });
          }
  
          // Atualiza os dados do usuário, verificando quais campos foram enviados
          const camposAtualizados = {};
          if (nome) camposAtualizados.nome = nome;
          if (email) camposAtualizados.email = email;
          if (senha) {
            const saltRounds = 10; // Define o custo da criptografia (maior = mais seguro, mas mais lento)
            camposAtualizados.senha = await bcrypt.hash(senha, saltRounds);
        }
  
          await usuario.update(camposAtualizados); // Atualiza o usuário no banco de dados
  
          res.status(200).json({
              mensagem: 'Usuário atualizado com sucesso',
              usuario: usuario // Retorna os dados atualizados
          });
      } catch (error) {
          console.error('Erro ao atualizar usuário:', error);
          res.status(500).json({ 
              mensagem: 'Erro ao atualizar o usuário', 
              erro: error.message 
          });
      }
  };
  
  