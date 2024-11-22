# Projeto de Servidor Express

Este projeto é um servidor web construído com Node.js e Express, que se conecta a um banco de dados usando Sequelize. Ele fornece rotas para gerenciar usuários, autenticação e notas de empenho.

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Rotas](#rotas)
- [Exemplo de Requisição](#exemplo-de-requisição)
  - [Cadastro de Usuário](#cadastro-de-usuário)
  - [Login](#login)
  - [Adicionar Nota de Empenho](#adicionar-nota-de-empenho)
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
  - **Requisição Exemplo**:
    ```bash
    curl -X POST http://localhost:3000/usuarios \
    -H "Content-Type: application/json" \
    -d '{
        "nome": "Sara",
        "email": "sara@teste.com",
        "senha": "123456"
    }'
    ```
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
  - **Requisição Exemplo**:
    ```bash
    curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email": "sara@teste.com", "senha": "123456"}'
    ```
  - **Resposta de sucesso**: 
    - Código: 200
    - Dados retornados: `token`, `usuario` (contendo `id`, `nome`, `email`)
  - **Resposta de erro**: 
    - Código: 400 se o usuário não for encontrado ou se a senha for inválida.
    - Código: 500 em caso de erro no servidor.

- `POST /auth/logout`: Realiza logout do usuário autenticado.

### Notas de Empenho
- `POST /notas/addNotaComItens`: Adiciona uma nova nota de empenho com itens. Exige os dados da nota no corpo da requisição.
  - **Requisição Exemplo**:
    ```bash
    curl -X POST http://localhost:3000/notas/addNotaComItens \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer seu_token_aqui" \
    -d '{
        "num_nota_empenho": "001",
        "num_pregao": "123456",
        "nome_orgao": "Ministério da Educação",
        "local_da_entrega": "Rua Exemplo, 123",
        "data_cadastro": "2023-10-01",
        "usuario_id": 6,
        "valor_total_nota": 500.00,
        "itens": [
            {
                "nome_item": "Item 1",
                "quantidade_total": 10,
                "valor_total": 100.00
            },
            {
                "nome_item": "Item 2",
                "quantidade_total": 5,
                "valor_total": 50.00
            }
        ]
    }'
    ```
  - **Resposta de sucesso**: 
    - Código: 201
    - Mensagem: `Nota cadastrada com sucesso!`
  - **Resposta de erro**: 
    - Código: 400 ou 500, dependendo do tipo de erro.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.