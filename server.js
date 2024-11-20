require('dotenv').config();
const express = require('express');
const { conectarDB } = require('./config/database');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados
sequelize.sync()
    .then(() => {
        console.log('Banco de dados conectado com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rotas
const usuarioRoutes = require('./routes/usuario.routes');
const authRoutes = require('./routes/auth.routes');
const notasRoutes = require('./routes/notas.routes')

app.use('/', usuarioRoutes);
app.use('/auth', authRoutes);
app.use('/notas', notasRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 
