# 📜 Projeto Labook

Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar, curtir e descurtir publicações.


## 🔨 Conteúdos e Ferramentas Utilizadas

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento
- Postman


## 💾 Banco de Dados

Diagrama do banco de dados demonstrando suas tabelas e a relação entre elas:

![projeto-labook (2)](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

https://dbdiagram.io/d/63d16443296d97641d7c1ae1

## 🖥️ Rodando o Projeto

Para rodar o projeto em sua máquina, siga as intruções seguintes:

1. Clone o repositório:

```bash
git clone https://github.com/LinconCS/projeto-labook-backend.git

```

2. Instale as dependências do projeto:

```bash
cd projeto-labook-backend
npm install
```

3. Inicie o servidor:

```bash
npm run dev
```

O servidor será iniciado na porta especificada na variável de ambiente `PORT` (padrão: 3003).


## 📌 Endpoints da API

- **POST /users/signup**: Realiza o cadastro de um novo usuário fornecendo um token JWT;
- **POST /users/login**: Faz o login do usuário fornecendo um token JWT;

- **POST /posts**: Cria um novo post;
- **GET /posts**: Retorna uma lista com todos os posts;
- **PUT /posts/:id**: Atualiza posts com base no Id; 
- **DELETE /posts/:id**: Exclui posts com base no Id;
- **PUT /posts/:id/like**: Retonar likes e dislikes em um post com base no Id.


- Segue link de publicação da API no Postman com maiores informações sobre os endpoints com exemplos de requisições e respostas: https://documenter.getpostman.com/view/28316412/2s9YeK3pwF