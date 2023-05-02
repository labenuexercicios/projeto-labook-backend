# Projeto Labook

## Índice:

- <a href="#Objetivo"> Objetivo </a>
- <a href="#Documentação da API"> Documentação da API </a>
- <a href="#Estruturação do banco de dados"> Estruturação do banco de dados </a>
- <a href="#Requisitos"> Requisitos: </a>
- <a href="#Como rodar este projeto?"> Como rodar este projeto? </a>
- <a href="#Técnologias utilizadas"> Técnologias utilizadas </a>
- <a href="#Autoria"> Autoria </a>
- <a href="#Próximos Passos"> Próximos Passos </a>

## Objetivo

O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações.

## Documentação da API

Link Demonstração:

## Estruturação do banco de dados

img aqui
![projeto-labook (2)](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

## Requisitos:

- Documentação Postman de todos os endpoints (obrigatória para correção)

- Endpoints

  - [x] signup
  - [x] login
  - [x] get posts
  - [x] create post
  - [x] edit post
  - [x] delete post
  - [x] like / dislike post

- Autenticação e autorização

  - [x] identificação UUID
  - [x] senhas hasheadas com Bcrypt
  - [x] tokens JWT

- Código

  - [x] POO
  - [x] Arquitetura em camadas
  - [x] Roteadores no Express

- README.md

## Como rodar este projeto?

```bash
#Clone este repositório
$ git clone lin krepo

#Acesse a pasta do projeto no seu terminal
$ cd nomeDaPasta

# Instale as dependencias
$ npm install

# Execute a aplicação
$ npm run dev

# A aplicação será iniciada na porta 3004, acesse pelo navegador: http://localhost:3003

```

## Técnologias utilizadas

1. [Node.js](https://nodejs.org/en)
2. [TypeScript](https://www.typescriptlang.org/)
3. [Express](https://expressjs.com/)
4. [SQLite3 / SQL](https://sqlite.org/index.html)
5. [Knex](https://knexjs.org/)
6. [POO](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_orientada_a_objetos)
7. [Arquiterura em camadas](https://pt.wikipedia.org/wiki/Arquitetura_multicamada)
8. [Geração de UUID](https://pt.wikipedia.org/wiki/Identificador_%C3%BAnico_universal)
9. [Geração de hashes](https://pt.wikipedia.org/wiki/Fun%C3%A7%C3%A3o_hash_criptogr%C3%A1fica)
10. [Autenticação e autorização](https://pt.wikipedia.org/wiki/Autoriza%C3%A7%C3%A3o)
    (https://pt.wikipedia.org/wiki/Autentica%C3%A7%C3%A3o)
11. [Roteamento](https://acervolima.com/roteamento-em-node-js/)
12. [Postman](https://www.postman.com/)

## Autoria

Michelle Antunes, abril/2023.
<br>

Linkedin: www.linkedin.com/in/michelle-antunes-868b24156
<br>
Email: miichelleantunes@outlook.com

## Próximos Passos

- [ ] Deploy
- [ ] Testes unitários
