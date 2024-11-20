const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ erro: 'Token não fornecido' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta_aqui');
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ erro: 'Token inválido' });
    }
};

module.exports = { authMiddleware }; 