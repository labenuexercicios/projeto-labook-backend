# Projeto Labook

O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações.<br>

## Conteúdos abordados

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
![projeto-labook (2)](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

## URLs de acesso
Documentação da API com as instruções de uso de cada endpoint da aplicação Labook.<br>

[Labook API](https://documenter.getpostman.com/view/26572176/2s9Y5YR2Eo)

# Lista de requisitos

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

## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro ou acesso a Login. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |


## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|
| `201` | Dados creado com sucesso(sucess).|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `404` | Registro pesquisado não encontrado (Not found).|
| `500` | Erro inesperado.|


## Iniciando 

Esse é um exemplo das intruções de como você configura o projeto localmente.
Para ter uma copia local, siga os passos abaixo:

### Instalação

1. Clone do repositório
  ```sh
  git clone https://github.com/lucasbreiafullstack/projeto-labook-backend.git
  ```
   
2. Install NPM TypeScript packages 
  ```sh
  npm init -y (cria package.json)
  ```
  ```sh
  npm i -g typescript (faz só 1 vez)
  ```
  ```sh
  npm i typescript -D (instala typescript no projeto)
  ```
  ```sh
  npx tsc -init (criar tsconfig.json)
  ```
  
3. Install NPM Express packages 
  
  ```sh
  npm install express
  ```
  ```sh
  npm install @types/express -D
  ```
  
4. Install NPM Cors packages 
  
  ```sh
  npm install cors
  ```
  ```sh
  npm install @types/cors -D
  ```
  
5. Install NPM Node packages 
  
  ```sh
  npm install ts-node-dev -D
  ```
6. Run NPM Identificador Único Universal (UUID)

  ```sh
  npm install uuid
   ```
  ```sh
  npm install -D @types/uuid
   ```
7. Run NPM Variáveis de ambiente (ENV)

  ```sh
  npm install dotenv
   ```
8. Run NPM JWT(Token)

  ```sh
  npm install jsonwebtoken
   ```
```sh
  npm install -D @types/jsonwebtoken
   ```
9. Run NPM Bcrypt

  ```sh
  npm i bcryptjs
   ```
 ```sh
  npm i -D @types/bcryptjs
   ```
10. Run NPM Jest

  ```sh
  npm i -D jest @types/jest ts-jest

   ```
11. Run NPM developer

  ```sh
  npm run dev
   ```

## Uso

Uma API onde as pessoas se conectam e interagem entre si.

Para iniciar o uso da API primeiramente entre no labook.sql na pasta database, crie a tabela users e insira o conteúdo, faça o mesmo com a tabela post. A tabela likes_dislikes deve ser criada, porém não insira nenhum dado nessa tabela, se popular essa tabela acarretará em erros no momento de inserir like e dislike no post.  

# Exemplos de requisição
Não precisa cadastrar o mesmo nome, email e quaisquer outros valores vistos aqui nos exemplos de saída. Porém, lembre-se de respeitar a estrutura pedida no banco de dados (nome das tabelas e colunas) e os nomes das propriedades na resposta da API.

Colunas a mais na tabela não tem problema, por exemplo adicionar uma 'category' dentro da tabela 'products', mas a falta de uma coluna ou propriedade na resposta será considerada falha de implementação!

## Signup
Endpoint público utilizado para cadastro. Devolve um token jwt.
```typescript
// request POST /users/signup
// body JSON
{
   "name": "Lucas", 
   "email": "lucas@email.com", 
   "password": "Lucas@123"
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
  "email": "lucas@email.com",
  "password": "Lucas@123"
}

// response
// status 200 OK
{
  token: "um token jwt"
}
```

## Get posts
Endpoint protegido, requer um token jwt para acessá-lo.
```typescript
// request GET /posts
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
       "id": "db704ae1-18c8-4895-9f54-165af46f66e6",
        "content": "To cansada e com o corpo doendo!!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-02-20T19:35:38.841Z",
        "updatedAt": "2023-02-20T19:37:22.265Z",
        "creator": {
            "creatorId": "8bc4ea9c-b511-4c14-bedd-16df2a077485",
            "creatorName": "Lucas"
        }
    },
    {
        "id": "uma uuid v4",
        "content": "Oi",
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

## Edit post
Endpoint protegido, requer um token jwt para acessá-lo.<br>
Só quem criou o post pode editá-lo e somente o conteúdo pode ser editado.
```typescript
// request PUT /posts/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu happy hour lá no point de sempre!"
}

// response
// status 200 OK
```

## Delete post
Endpoint protegido, requer um token jwt para acessá-lo.<br>
Só quem criou o post pode deletá-lo. Admins podem deletar o post de qualquer pessoa.

```typescript
// request DELETE /posts/:id
// headers.authorization = "token jwt"

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
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
```

### Para entender a tabela likes_dislikes
- no SQLite, lógicas booleanas devem ser controladas via 0 e 1 (INTEGER)
- quando like valer 1 na tabela é porque a pessoa deu like no post
    - na requisição like é true
    
- quando like valor 0 na tabela é porque a pessoa deu dislike no post
    - na requisição like é false
    
- caso não exista um registro na tabela de relação, é porque a pessoa não deu like nem dislike
- caso dê like em um post que já tenha dado like, o like é removido (deleta o item da tabela)
- caso dê dislike em um post que já tenha dado dislike, o dislike é removido (deleta o item da tabela)

## Contato

Lucas  - lucas.devfullstack021@gmail.com

Project Link: [https://github.com/lucasbreiafullstack/projeto-labook-backend.git](https://github.com/lucasbreiafullstack/projeto-labook-backend.git)
<br/>

[![Linkedin](https://img.shields.io/badge/linkedin-%230A66C2.svg?&style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/lucas-breia/)](https://www.linkedin.com/in/lucas-breia/)

## Agradecimentos

* Aos professores da Labenu.
* Meus colegas da turma Ozemela que me ajudaram no processo do projeto.
* Meus familiares pelo apoio ao longo da construção do projeto.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/lucasbreiafullstack/projeto-react-apis.svg?style=for-the-badge
[contributors-url]: https://github.com/lucasbreiafullstack/projeto-react-apis/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lucasbreiafullstack/projeto-react-apis.svg?style=for-the-badge
[forks-url]: https://github.com/lucasbreiafullstack/projeto-react-apis/network/members
[stars-shield]: https://img.shields.io/github/stars/lucasbreiafullstack/projeto-react-apis.svg?style=for-the-badge
[stars-url]: https://github.com/lucasbreiafullstack/projeto-react-apis/stargazers
[issues-shield]: https://img.shields.io/github/issues/lucasbreiafullstack/projeto-react-apis.svg?style=for-the-badge
[issues-url]: https://github.com/lucasbreiafullstack/projeto-react-apis/issues
[license-shield]: https://img.shields.io/github/license/lucasbreiafullstack/projeto-react-apis.svg?style=for-the-badge
[license-url]: https://github.com/lucasbreiafullstack/projeto-react-apis/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/lucasbreiafullstack
[product-screenshot]: readme-image/projeto-react-apis.gif
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Styled-components]:https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[Styled-url]: https://www.styled-components.com/
[Chakra-UI]: https://img.shields.io/static/v1?style=for-the-badge&message=Chakra+UI&color=319795&logo=Chakra+UI&logoColor=FFFFFF&label=
[Chakra-url]: https://chakra-ui.com/getting-started
