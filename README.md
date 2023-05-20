#  - Desenvolvido por Clara -

### Veja a documentação: 
[**API Labook**](https://documenter.getpostman.com/view/26000888/2s93m1aPzE)
<br>

# Projeto Labook

O Labook é uma rede social que visa conectar e interagir pessoas, permitindo que os usuários criem e curtam posts. O projeto consiste em uma API que fornece funcionalidades CRUD para posts, além de cadastro e login de usuários.

Os usuários podem criar, visualizar, atualizar e excluir seus próprios posts, bem como curtir e descurtir posts de outros usuários. A autenticação é feita por meio de tokens JWT, garantindo a segurança das informações e das operações realizadas pelos usuários.

O projeto foi desenvolvido seguindo as melhores práticas de programação e utilizando tecnologias modernas, visando uma ótima performance e uma experiência de usuário agradável e intuitiva. Durante o desenvolvimento, foram aplicados conceitos de design e arquitetura para garantir a escalabilidade e a manutenibilidade do código.


## **Tecnologias Utilizadas:**
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

## Banco de dados:
![projeto-labook](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

# **API Labook**
- Documentação [**Postman**](https://documenter.getpostman.com/view/26000888/2s93m1aPzE) com todos os endpoints;
- **Endpoints:**
    - **Users:**
        - Signup
            - Cadastra uma nova pessoa.
        - Login
            - Efetua o login de uma pessoa cadastrada.
        - Get all users        
            - Retorna todas as pessoas cadastradas.
            - Pode ser enviado uma query, q fará uma busca do parâmetro no nome do usuário, retornando o/os usuários se existirem.
            - **Somente admins tem acesso a esse endpoint.**
    - **Posts:**    
        - Create Post
            - Adiciona um post.
        - Get Posts
            - Retorna todos os posts.
        - Edit Post
            - Edita um post.
        - Delete Post
            - Deleta um post.
            - Só quem criou o post pode deletá-lo.
            - **Admins podem deletar o post de qualquer pessoa.**
        - Like / Dislike Post.
            - Quem criou o post não pode dar like ou dislike no mesmo.
            - Caso dê um like em um post que já tenha dado like, o like é desfeito.
            - Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito.
            - Caso dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.
            - Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.

- **Autenticação e autorização:**
    - Identificação UUID
    - Senhas hasheadas com Bcrypt
    - Tokens JWT
 
 - **Código**
    - POO
    - Arquitetura em camadas
    - Roteadores no Express

## **Instalação:**

Para instalar a [**API Labook**](https://documenter.getpostman.com/view/26000888/2s93m1aPzE), você precisará seguir os seguintes passos:

- Certifique-se de que o Node.js e o gerenciador de pacotes NPM estejam instalados em seu sistema.
- Baixe ou clone o repositório do projeto em sua máquina.
- Abra o terminal no diretório do projeto e execute o comando npm install para instalar todas as dependências necessárias.
- Crie e configure a database com o SQLServer. Siga o caminho em .env.example.
- Em seguida, execute o comando npm run start para iniciar o servidor localmente. Ou execute o comando npm run dev para iniciar o servidor da API em modo de desenvolvimento.
- Agora você pode acessar a API usando o endpoint http://localhost:3000/.
- Para obter informações mais detalhadas sobre como usar os endpoints, consulte a documentação da [**API Labook**](https://documenter.getpostman.com/view/26000888/2s93m1aPzE).