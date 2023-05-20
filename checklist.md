Projeto Labook 
- Endpoints
    - [ ]  signup
    - [ ]  login
    - [ ]  get posts
    - [ ]  create post
    - [ ]  edit post
    - [ ]  delete post
    - [ ]  like / dislike post

- Autenticação e autorização
    - [ ]  identificação UUID
    - [ ]  senhas hasheadas com Bcrypt
    - [ ]  tokens JWT
 
 - Código
    - [ ]  POO
    - [ ]  Arquitetura em camadas
    - [ ]  Roteadores no Express

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
- Documentação Postman


depedências

npm i cors dotenv express jsonwebtoken knex sqlite3 uuid zod bcryptjs

dev depedências

@types/cors @types/express @types/jsonwebtoken @types/knex @types/node @types/uuid @types/bcryptjs ts-node-dev typescript

Desenvolver uma aplicação em Node.js para criar, editar, excluir e obter postagens de usuários.
Utilizar o padrão de arquitetura MVC (Model-View-Controller).
Utilizar o banco de dados PostgreSQL.
Implementar autenticação e autorização de usuários usando tokens JWT.
Utilizar a biblioteca bcryptjs para hash de senhas.
Utilizar a biblioteca jsonwebtoken para geração e verificação de tokens JWT.
Implementar validações nos dados de entrada usando a biblioteca zod.
Seguir boas práticas de programação, como separação de responsabilidades, modularização do código, tratamento de erros e uso de design patterns.

1. Configuração de ambiente:
   - O arquivo `.env` contém as variáveis de ambiente, como a porta do servidor, caminho do arquivo do banco de dados, chave JWT, duração do token, custo do bcrypt, entre outras.

2. Pasta "services":
   - Arquivo `TokenManager.ts`:
     - Fornece funcionalidades para criação e obtenção de tokens JWT.
     - Utiliza a biblioteca `jsonwebtoken` para lidar com a geração e verificação de tokens.
     - Define a interface `TokenPayload` para representar as informações contidas no token.
     - Possui métodos para criar um token com base em um payload e obter o payload de um token.

   - Arquivo `IdGenerator.ts`:
     - Gera IDs únicos usando a biblioteca `uuid`.

   - Arquivo `HashManager.ts`:
     - Realiza o hash de senhas e comparação de hashes usando a biblioteca `bcryptjs`.

3. Pasta "models":
   - Arquivo `User.ts`:
     - Define a enumeração `USER_ROLES` para representar os diferentes papéis de usuário.
     - Define as interfaces `UserDB`, `UserModel` e `TokenPayload` relacionadas ao usuário.
     - Implementa a classe `User` com os atributos e métodos relacionados ao usuário.
     - Possui métodos para converter o usuário em modelos de banco de dados, modelo de negócios e payload de token.

   - Arquivo `Post.ts`:
     - Define as interfaces `PostDB`, `PostWithCreatorDB`, `PostModel` e `LikeDislikeDB` relacionadas às postagens.
     - Define a enumeração `POST_LIKE` para representar os diferentes estados de curtida em uma postagem.
     - Implementa a classe `Post` com os atributos e métodos relacionados à postagem.
     - Possui métodos para converter a postagem em modelos de banco de dados e modelo de negócios.

4. Pasta "Dto/Post":
   - Arquivo `CreatePost.ts`:
     - Define as interfaces `CreatePostInputDTO` e `CreatePostOutputDTO` relacionadas à criação de postagens.
     - Define o esquema de validação `CreatePostSchema` para validar os dados de entrada.

   - Arquivo `DeletePost.ts`:
     - Define as interfaces `DeletePostByIdInputDTO` e `DeletePostByIdOutputDTO` relacionadas à exclusão de postagens.
     - Define o esquema de validação `DeletePostByIdSchema` para validar os dados de entrada.

   - Arquivo `EditPost.ts`:
     - Define as interfaces `EditPostByIdInputDTO` e `EditPostByIdOutputDTO` relacionadas à edição de postagens.
     - Define o esquema de validação `EditPostByIdSchema` para validar os dados de entrada.

   - Arquivo `GetPosts.ts`:
     - Define as interfaces `GetPostsInputDTO` e `GetPostsOutputDTO` relacionadas à obtenção de postagens.
     - Define o esquema de validação `GetPostsSchema` para validar os dados de entrada.

   - Arquivo `LikeOrDislikePost.ts`:
     - Define as interfaces `LikeOrDislikePostInputDTO` e `LikeOrDislikePostOutputDTO` relacionadas à curtida ou descurtida de postagens.
     - Define o esquema

 de validação `LikeOrDislikePostSchema` para validar os dados de entrada.

Espero que esse resumo seja útil!