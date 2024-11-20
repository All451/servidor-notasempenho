# Projeto de Servidor Express

Este projeto é um servidor web construído com Node.js e Express, que se conecta a um banco de dados SQLITE
usando Sequelize. Ele fornece rotas para gerenciar usuários, autenticação e notas de empenho.

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Rotas](#rotas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd nome-do-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente, como a porta e as credenciais do banco de dados.

## Uso

Para iniciar o servidor, execute o seguinte comando:

```bash
node server.js
```

O servidor estará rodando na porta especificada (padrão: 3000).

## Rotas

As seguintes rotas estão disponíveis:

### Usuários
- `POST /usuarios`: Cria um novo usuário. Exige `nome`, `email` e `senha` no corpo da requisição.
  - **Resposta de sucesso**: 
    - Código: 201
    - Mensagem: `Usuário criado com sucesso`
    - Dados do usuário criado: `id`, `nome`, `email`
  - **Resposta de erro**: 
    - Código: 400 se o email já estiver cadastrado.
    - Código: 500 em caso de erro ao criar o usuário.

- `GET /perfil`: Retorna os dados do perfil do usuário autenticado.
  - **Resposta de sucesso**: 
    - Código: 200
    - Dados do usuário: `id`, `nome`, `email`
  - **Resposta de erro**: 
    - Código: 404 se o usuário não for encontrado.
    - Código: 500 em caso de erro ao buscar o perfil.

### Autenticação
- `POST /auth/login`: Realiza login. Exige `email` e `senha` no corpo da requisição.
  - **Resposta de sucesso**: 
    - Código: 200
    - Dados retornados: `token`, `usuario` (contendo `id`, `nome`, `email`)
  - **Resposta de erro**: 
    - Código: 400 se o usuário não for encontrado ou se a senha for inválida.
    - Código: 500 em caso de erro no servidor.

- `POST /auth/logout`: Realiza logout do usuário autenticado.

### Notas de Empenho
- `POST /addNotaComItens`: Adiciona uma nova nota de empenho com itens. Exige os dados da nota no corpo da requisição.
  - **Resposta de sucesso**: 
    - Código: 201
    - Mensagem: `Nota de empenho criada com sucesso`
  - **Resposta de erro**: 
    - Código: 500 em caso de erro ao criar a nota.

- `GET /notas`: Lista todas as notas de empenho.
  - **Resposta de sucesso**: 
    - Código: 200
    - Dados: Lista de notas de empenho.
  - **Resposta de erro**: 
    - Código: 500 em caso de erro ao listar as notas.

- `GET /notas/:id`: Obtém detalhes de uma nota específica. Exige o `id` da nota na URL.
  - **Resposta de sucesso**: 
    - Código: 200
    - Dados: Detalhes da nota.
  - **Resposta de erro**: 
    - Código: 404 se a nota não for encontrada.
    - Código: 500 em caso de erro ao buscar a nota.

- `PUT /notas/:id`: Atualiza uma nota existente. Exige o `id` da nota na URL e os dados atualizados no corpo da requisição.
  - **Resposta de sucesso**: 
    - Código: 200
    - Mensagem: `Nota de empenho atualizada com sucesso`
  - **Resposta de erro**: 
    - Código: 404 se a nota não for encontrada.
    - Código: 500 em caso de erro ao atualizar a nota.

- `DELETE /notas/:id`: Remove uma nota existente. Exige o `id` da nota na URL.
  - **Resposta de sucesso**: 
    - Código: 204
    - Mensagem: `Nota de empenho removida com sucesso`
  - **Resposta de erro**: 
    - Código: 404 se a nota não for encontrada.
    - Código: 500 em caso de erro ao remover a nota.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
