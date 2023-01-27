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
// request POST /users/signup
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

## Login
```typescript
// request POST /users/login
// body JSON
{
  "email: "beltrana@email.com",
  "password": "beltrana00"
}

// response
// status 200 OK
{
  token: "um token jwt"
}
```

## Get posts
```typescript
// request GET /posts

// response
// status 200 OK
[
    {
        "id": "uma uuid v4",
        "content": "Hoje vou estudar POO!",
        "likes": 2,
        "dislikes" 1,
        "createdAt": "2023-01-20T12:11:47:000Z"
        "updatedAt": "2023-01-20T12:11:47:000Z"
        "creator": {
            "id": "uma uuid v4",
            "name": "Fulano"
        }
    },
    {
        "id": "uma uuid v4",
        "content": "kkkkkkkkkrying",
        "likes": 0,
        "dislikes" 0,
        "createdAt": "2023-01-20T15:41:12:000Z"
        "updatedAt": "2023-01-20T15:49:55:000Z"
        "creator": {
            "id": "uma uuid v4",
            "name": "Ciclana"
        }
    }
]
```

## Create post
```typescript
// request POST /posts
// headers.Authorization = "token jwt"
// body JSON
{
    "content": "Partiu happy hour!"
}

// response
// status 201 CREATED
[
    {
        "id": "uma uuid v4",
        "content": "Partiu happy hour!",
        "likes": 3,
        "dislikes" 0,
        "created_at": "2023-01-21T16:00:26:000Z"
        "updated_at": "2023-01-21T16:00:26:000Z"
        "creator": {
            "id": "uma uuid v4",
            "name": "Fulano"
        }
    }
]
```

## Edit post
```typescript
// request PUT /posts/:id
// headers.Authorization = "token jwt"
// body JSON
{
    "content": "Partiu happy hour lá no point de sempre!"
}

// response
// status 200 OK
```

## Delete post
```typescript
// request DELETE /posts/:id
// headers.Authorization = "token jwt"

// response
// status 200 OK
```

## Like or dislike post
### Like
```typescript
// request PUT /posts/:id/like
// headers.Authorization = "token jwt"
// body JSON
{
    like: 1
}

// response
// status 200 OK
```

### Dislike
```typescript
// request PUT /posts/:id/like
// headers.Authorization = "token jwt"
// body JSON
{
    like: 0
}

// response
// status 200 OK
```
