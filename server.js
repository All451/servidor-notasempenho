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
  origin: 'https://super-garbanzo-g4xv7x79r4pqhvjj7-8080.app.github.dev',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rotas
const authRoutes = require('./routes/auth.routes');
const notasRoutes = require('./routes/notas.routes');
const entregaRoutes = require('./routes/entregas.routes');

app.use('/auth', authRoutes);
app.use('/notas', notasRoutes);
app.use('/entrega', entregaRoutes);

sequelize.sync({ force: false })  // 'force: false' para não apagar os dados existentes
    .then(() => {
        console.log('Banco de dados e tabelas criados ou verificados!');
    })
    .catch((error) => {
        console.error('Erro ao conectar ou criar banco de dados:', error);
    });
    

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 
