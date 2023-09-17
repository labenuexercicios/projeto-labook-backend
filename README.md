# Labook API

O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações. Esta API é parte do projeto final do módulo de back-end do curso de Desenvolvimento Web FullStack da escola de programação "Labenu". Com exceção dos endpoints de login e signup, todos os demais endpoints são protegidos por um token, que expira em até sete dias.

O usuário poderá acessar a documentação desta API no Postman através deste [link](https://documenter.getpostman.com/view/26594506/2s9Y5ZuMcQ).

### Conteúdos abordados

• NodeJS

• Typescript

• Express

• SQL e SQLite

• Knex

• POO

• Arquitetura em camadas

• Geração de UUID

• Geração de hashes

• Autenticação e autorização

• Roteamento

• Postman


## Banco de dados 🎲🎲

O banco de dados contém três tabelas com as seguintes colunas:

### users 🙍🙆
- id
- name
- email
- password
- role
- created_at
##
### posts ✍️✍️
- id
- creator_id
- content
- likes
- dislikes
- created_at
- updated_at
##
### likes_dislikes 👍👎
- user_id 
- post_id
- like
##

#### Modelagem do banco de dados. 

As relações entre as tabelas, tal como a tipagem de suas colunas foram elaboradas da seguinte maneira:

![image](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

###

# Lista de endpoints

<img src="https://i.ibb.co/RSyGsSQ/image.png" alt="endpoints"></img>


## Signup
Endpoint público utilizado para cadastro. Devolve um token jwt.
```typescript
// request POST /users/signup
// body JSON
{
  "name": "Beltrana",
  "email": "beltrana@email.com",
  "password": "beltrana00"
}

// response
// status 201 CREATED
{
  token: "um token jwt"
}
```

## Login
Endpoint público utilizado para login. Devolve um token jwt.
```typescript
// request POST /users/login
// body JSON
{
  "email": "beltrana@email.com",
  "password": "beltrana00"
}

// response
// status 200 OK
{
  token: "um token jwt"
}
```


## Get users
Endpoint protegido, requer um token jwt para acessá-lo.
```typescript
// request GET /users
// headers.authorization = "token jwt"

// body JSON
{
  "name": "Nome do usuário (opcional)"
}

// response
// status 200 OK
[
    {
        "id": "uma uuid v4",
        "name": "Beltrano",
        "email": "beltrano@email.com",
        "role": "ADMIN",
        "createdAt": "2023-08-26T06:32:32.991Z"
    },
    {
        "id": "uma uuid v4",
        "name": "Siclana",
        "email": "siclana@email.com",
        "role": "NORMAL",
        "createdAt": "2023-08-26T06:32:32.991Z"
    },
    {
        "id": "uma uuid v4",
        "name": "Fulana",
        "email": "fulana@email.com",
        "role": "NORMAL",
        "createdAt": "2023-08-26T06:32:32.991Z"
    }
]
```

## Edit user by id
Endpoint protegido, requer um token jwt para acessá-lo. Apenas o dono da conta poderá acessar este endpoint. Todos os elementos do body são opcionais.
```typescript
// request PUT /users/?id
// query params = "id"
// headers.authorization = "token jwt"
// body JSON
{
    "name": "Um novo name",
    "email: "Um novo email",
    "password: "Uma nova senha"
}

// response
// status 200 OK
    {
        "message: "Usuário editado com sucesso"
    }
```

## Edit user role by id
Endpoint protegido, requer um token jwt para acessá-lo. Apenas um administrador pode acessar este endpoint, pois ele realiza a troca de role/função de uma conta.
```typescript
// request PUT /users/role/?id
// query params = "id"
// headers.authorization = "token jwt"
// body JSON
{
    "role": "ADMIN ou NORMAL"
}

// response
// status 200 OK
    {
          id: "id do usuário",
          name: "nome do usuário",
          role: "nova role do usuário",
    }
```

## Delete user by id
Endpoint protegido, requer um token jwt para acessá-lo. Apenas um administrador ou o dono da conta poderá acessar este endpoint.
```typescript
// request DELETE /users/?id
// query params = "id"
// headers.authorization = "token jwt"

// response
// status 200 OK
    {
        "message: "Usuário deletado com sucesso"
    }
```

## Create post
Endpoint protegido, requer um token jwt para acessá-lo.
```typescript
// request POST /posts
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu happy hour!"
}

// response
// status 201 CREATED
```

## Get posts
Endpoint protegido, requer um token jwt para acessá-lo. O usuário pode inserir um trecho da postagem que ele deseja procurar, sendo algo opcional.
```typescript
// request GET /posts
// headers.authorization = "token jwt"
// body JSON
{
  "content": "Conteúdo da postagem (opcional)"
}

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

## Get post by id
Endpoint protegido, requer um token jwt para acessá-lo. 
```typescript
// request GET /posts/?id
// query params = "id"
// headers.authorization = "token jwt"
// response
// status 200 OK
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
```

## Edit post
Endpoint protegido, requer um token jwt para acessá-lo. Somente quem criou o post pode editá-lo e somente o conteúdo pode ser editado.
```typescript
// request PUT /posts/?id
// path params = "id"
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu happy hour lá no point de sempre!"
}

// response
// status 200 OK
```


## Like or dislike post (mesmo endpoint faz as duas coisas)

Endpoint protegido, requer um token jwt para acessá-lo.<br>
Quem criou o post não pode dar like ou dislike no mesmo.<br><br>
Caso dê um like em um post que já tenha dado like, o like é desfeito.<br>
Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito.<br><br>
Caso dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.<br>
Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.
### Like (funcionalidade 1)
```typescript
// request PUT /posts/:id/like
// path params = "id"
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
```

### Dislike (funcionalidade 2)
```typescript
// request PUT /posts/:id/like
// path params = "id"
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
```

## Delete post
Endpoint protegido, requer um token jwt para acessá-lo. Somente um administrador ou o criador do post pode acessar este endpoint.

```typescript
// request DELETE /posts/?id
// query params = "id"
// headers.authorization = "token jwt"

// response
// status 200 OK
```
