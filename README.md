# Labook

[Documentação Labook API](https://documenter.getpostman.com/view/28315812/2s9YeHbBMQ)

O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações.

O projeto possui a criação de API e banco de dados, implementação de segurança, código escalável seguindo padrões de design e arquitetura POO (Programação orientada a objetos).

## Conteúdos abordados
<p align="left">
<br>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=postman,nodejs,typescript,express,sqlite,mysql" style="height: 25px;"/>
  </a>
</p>

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

### Modelagem de relação entre as tabelas
![projeto-labook (2)](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

https://dbdiagram.io/d/63d16443296d97641d7c1ae1

- Endpoints
    - [ ]  signup
    - [ ]  login
    - [ ]  create post
    - [ ]  get posts
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

### Exemplos de requisição

### Signup

- **Descrição**: Cadastra um novo _user_.
- **Método**: POST
- **URL**: `/users/signup`

### Login

- **Descrição**: Login do _user_.
- **Método**: POST
- **URL**: `/users/login`

### Create post

- **Descrição**: Cadastra umo novo _post_.
- **Método**: POST
- **URL**: `/posts`

### Get posts

- **Descrição**: Retorna todos _posts_ cadastrados.
- **Método**: GET
- **URL**: `/posts`

### Edit post

- **Descrição**: Edita um _post_ cadastrado.
- **Método**: PUT
- **URL**: `/posts/:id`

### Like

- **Descrição**: Da um like em um _post_ cadastrado.
- **Método**: PUT
- **URL**: `/posts/:id/like`

### Dislike

- **Descrição**: Da um dislike em um _post_ cadastrado.
- **Método**: PUT
- **URL**: `/posts/:id/like`

### Delete post

- **Descrição**: Deleta um _post_ cadastrado.
- **Método**: DELETE
- **URL**: `/posts/:id/`

## Postman

Para testar os endpoints da API, você pode usar o [**Postman**](https://documenter.getpostman.com/view/28315812/2s9YC8xBvZ). Basta importar a coleção no Postman para começar a fazer solicitações e testar os diferentes recursos da API.

## Como instalar e executar o projeto

### Pré-requisitos

Antes de começar, certifique-se de atender aos seguintes requisitos:

- Node.js e VScode instalados em sua máquina.


```bash / terminal
# clonar repositório
git clone https://github.com/felipelimars/projeto-labook-backend.git

# Abra o projeto no Visual Studio Code (ou em seu editor de código preferido).

# instalar dependências
npm install

# executar o projeto
npm run dev
```

Agora o servidor está em execução e conectado com a API.

# Autor

[**Felipe Lima**](https://www.linkedin.com/in/felipelimars)
