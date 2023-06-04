Este é o projeto Labook, uma rede social com o objetivo de promover a conexão e interação entre pessoas. Os usuários cadastrados no aplicativo podem criar e curtir publicações.

Neste projeto, além das bases de criação de APIs e banco de dados, iremos focar na implementação de segurança e códigos mais escaláveis. Durante o prazo de entrega, abordaremos diversos conceitos e formas de desenvolvimento, seguindo padrões de design e arquitetura. O seu desafio será unir as funcionalidades com as boas práticas de código.

Conteúdos abordados
NodeJS
Typescript
Express
SQL e SQLite
Knex
Programação Orientada a Objetos (POO)
Arquitetura em camadas
Geração de UUID
Geração de hashes
Autenticação e autorização
Roteamento
Postman endpoints: Documentação do Postman
Banco de dados
projeto-labook (2)

Você pode visualizar o diagrama do banco de dados no seguinte link: Diagrama do Banco de Dados

Lista de requisitos
Documentação Postman de todos os endpoints (obrigatória para correção)

Endpoints

 signup
 login
 get posts
 create post
 edit post
 delete post
 like / dislike post
Autenticação e autorização

 identificação UUID
 senhas hasheadas com Bcrypt
 tokens JWT
Código

 POO
 Arquitetura em camadas
 Roteadores no Express
README.md

Exemplos de requisição
Signup
Endpoint público utilizado para cadastro. Retorna um token JWT.

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
Login
Endpoint público utilizado para login. Retorna um token JWT. As senhas dos usuários e primeiro nome seguido de 123.

// request POST /users/login
// body JSON
{
  "email": "beltrana@email.com",
  "password": "beltrana123"
}

// response
// status 200 OK
{
  token: "um token jwt"
}
Get posts
Endpoint protegido, requer um token JWT para acessá-lo.

// request GET /posts
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
        "id": "uma uuid v4",
        "content": "Hoje vou estudar POO!",
        "likes": 2,
        "dislikes": 1,
        "createdAt": "2023-01-20T12:11:47:000Z",
        "updatedAt": "2023-01-20T12:11:47:000Z",
        "creator

": {
            "id": "uma uuid v4",
            "name": "Fulano"
        }
    },
    {
        "id": "uma uuid v4",
        "content": "kkkkkkkkkrying",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-01-20T15:41:12:000Z",
        "updatedAt": "2023-01-20T15:49:55:000Z",
        "creator": {
            "id": "uma uuid v4",
            "name": "Ciclana"
        }
    }
]
Create post
Endpoint protegido, requer um token JWT para acessá-lo.

// request POST /posts
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu happy hour!"
}

// response
// status 201 CREATED
Edit post
Endpoint protegido, requer um token JWT para acessá-lo. Apenas o criador do post pode editá-lo, e somente o conteúdo pode ser editado.

// request PUT /posts/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu happy hour lá no point de sempre!"
}

// response
// status 200 OK
Delete post
Endpoint protegido, requer um token JWT para acessá-lo. Apenas o criador do post pode deletá-lo. Administradores podem deletar o post de qualquer pessoa.

// request DELETE /posts/:id
// headers.authorization = "token jwt"

// response
// status 200 OK
Like or dislike post (o mesmo endpoint faz as duas ações)
Endpoint protegido, requer um token JWT para acessá-lo. O criador do post não pode dar like ou dislike no próprio post.

Caso seja dado um like em um post que já tenha recebido like, o like é desfeito. Caso seja dado um dislike em um post que já tenha recebido dislike, o dislike é desfeito.

Caso seja dado um like em um post que já tenha recebido dislike, o like sobrescreve o dislike. Da mesma forma, caso seja dado um dislike em um post que já tenha recebido like, o dislike sobrescreve o like.

Like (funcionalidade 1)
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
Dislike (funcionalidade 2)
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
Tabela likes_dislikes
No SQLite, lógicas booleanas devem ser controladas através de 0 e 1 (INTEGER).

Quando o campo "like" possuir o valor 1 na tabela, significa que a pessoa deu like no post.

Na requisição, quando "like" é true.
Quando o campo "like" possuir o valor 0 na tabela, significa que a pessoa deu dislike no post.

Na requisição, quando "like" é false.
Caso não exista um registro na tabela de relação, significa que a pessoa não deu like nem dislike.

Caso seja dado like em um

post que já tenha recebido like, o like é removido (o item é deletado da tabela).

Caso seja dado dislike em um post que já tenha recebido dislike, o dislike é removido (o item é deletado da tabela).