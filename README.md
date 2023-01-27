# Projeto Labook
O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações.

Agora que temos as bases de criação de APIs e banco de dados, o próximo nível é a implementação de segurança e códigos mais escaláveis. Veremos durante o prazo de entrega desse projeto inúmeros conceitos e formas de desenvolvimento seguindo padrões de design e arquitetura, e seu desafio será unir as funcionalidades com as boas práticas de código.

# Conteúdos abordados
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

# Banco de dados
https://dbdiagram.io/d/63d16443296d97641d7c1ae1

# Lista de requisitos
- Endpoints
    - [ ]  signup
    - [ ]  login
    - [ ]  get posts
    - [ ]  create post
    - [ ]  edit post
    - [ ]  delete post
    - [ ]  like / dislike post

- Código
    - [ ]  POO
    - [ ]  Arquitetura em camadas

- Autenticação e autorização
    - [ ]  identificação UUID
    - [ ]  senhas hasheadas com Bcrypt
    - [ ]  tokens JWT
    - [ ]  somente quem se logou pode criar posts
    - [ ]  somente quem se logou pode dar like ou dislike em um post
    - [ ]  somente admins podem deletar posts de outras pessoas

# Exemplos de requisição

## Signup
```typescript
// request
// body JSON
{
  "name": "Beltrana",
  "email: "beltrana@email.com",
  "password": "beltrana00"
}

// response
// status 201 CREATED
{
  token: "um token jwt"
}
```
