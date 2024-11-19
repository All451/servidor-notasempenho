const jwt = require('jsonwebtoken');

const gerarToken = (usuario) => {
    const payload = {
        id: usuario.id,
        email: usuario.email,
        cargo: usuario.cargo
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = { gerarToken }; 