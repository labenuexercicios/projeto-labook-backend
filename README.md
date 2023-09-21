# labook-back-end
O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações. 


# Url da documentação no PostMan:
https://documenter.getpostman.com/view/27736274/2s9Xy6qACb


# Endpoints
# 1. Cadastro de Usuário
Endpoint para o cadastro de novos usuários na plataforma.

Método: POST
URL: /users/signup
Exemplo de Requisição:
bash
Copy code
curl --location 'http://localhost:3003/users/signup' \
--data-raw '{
  "name": "Novo Usuario",
  "email": "novo@email.com",
  "password": "novo123"
}'


# 2. Login de Usuário
Endpoint para realizar o login na plataforma.

Método: POST
URL: /users/login
Exemplo de Requisição:
bash
Copy code
curl --location 'http://localhost:3003/users/login' \
--data-raw '{
  "email": "novo@email.com",
  "password": "novo123"
}'


# 3. Criação de Post
Endpoint para criar um novo post.

Método: POST
URL: /posts
Headers:
Authorization: Token de autenticação obtido no login
Exemplo de Requisição:
bash
Copy code
curl --location 'http://localhost:3003/posts' \
--header 'Authorization: <seu_token_aqui>' \
--data '{
    "content": "Novo post na sua pagina."
}'


# 4. Listagem de Posts
Endpoint para listar todos os posts com o nome do criador.

Método: GET
URL: /posts
Exemplo de Requisição:
bash
Copy code
curl --location 'http://localhost:3003/posts'


# 5. Edição de Post
Endpoint para editar um post existente.

Método: PUT
URL: /posts/:id
Headers:
Authorization: Token de autenticação obtido no login
Exemplo de Requisição:
bash
Copy code
curl --location 'http://localhost:3003/posts/<id_do_post_aqui>' \
--header 'Authorization: <seu_token_aqui>' \
--data '{
    "content": "Post editado."
}'


# 6. Remoção de Post
Endpoint para deletar um post.

Método: DELETE
URL: /posts/:id
Headers:
Authorization: Token de autenticação obtido no login
Exemplo de Requisição:
bash
Copy code
curl --location -X DELETE 'http://localhost:3003/posts/<id_do_post_aqui>' \
--header 'Authorization: <seu_token_aqui>'


# 7. Curtir/Descurtir Post
Endpoint para curtir ou descurtir um post.

Método: PUT
URL: /posts/:id/like
Headers:
Authorization: Token de autenticação obtido no login
Exemplo de Requisição para Curtir:
bash
Copy code
curl --location -X PUT 'http://localhost:3003/posts/<id_do_post_aqui>/like' \
--header 'Authorization: <seu_token_aqui>'

# Considerações Finais
Esta documentação detalhou as principais funcionalidades e endpoints do projeto Labook, uma aplicação de rede social. Certifique-se de seguir o formato de solicitação adequado para cada endpoint e incluir o token de autenticação nos headers sempre que necessário. Em caso de dúvidas ou problemas, entre em contato com a equipe de suporte. Divirta-se usando o Labook!


