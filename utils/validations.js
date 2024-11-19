const Joi = require('joi');

const schemas = {
    cadastro: Joi.object({
        nome: Joi.string().required().min(3).max(50),
        email: Joi.string().email().required(),
        senha: Joi.string().required().min(6),
        cargo: Joi.string().valid('usuario', 'admin').required()
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().required()
    }),

    alterarSenha: Joi.object({
        senhaAtual: Joi.string().required(),
        novaSenha: Joi.string().required().min(6)
    })
};

module.exports = schemas; 