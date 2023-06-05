O Labook é uma rede social que tem como objetivo conectar pessoas e promover interações entre elas. Os usuários podem se cadastrar e criar publicações, além de curtir o conteúdo de outros usuários.

A API Labook foi desenvolvida utilizando tecnologias como NodeJS, Typescript, Express, SQLite, Knex, Programação Orientada a Objetos (POO) e Arquitetura em camadas. Essas tecnologias foram escolhidas para garantir um desenvolvimento eficiente e seguro da aplicação.

A API possui uma coleção de endpoints no Postman, que permite gerenciar usuários, posts e curtidas. Alguns dos endpoints disponíveis são o cadastro de usuários, login, criação de posts, obtenção de posts, edição e exclusão de posts, além da possibilidade de dar like ou dislike em publicações de outros usuários.


Para utilizar a API Labook em seu ambiente local, siga os seguintes passos:

1. Faça o download ou clone o repositório da API Labook.
2. Abra o terminal, navegue até o diretório raiz do projeto e execute o comando `npm install` (ou `yarn`) para instalar as dependências.
3. Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias, como o host do banco de dados, usuário, senha, nome do banco e chave secreta JWT.
4. Execute o comando `npm run create-tables` (ou `yarn create-tables`) para criar as tabelas no banco de dados.
5. Finalmente, inicie a API Labook executando o comando `npm start` (ou `yarn start`).

A API estará disponível no endereço http://localhost:3000. Agora você pode utilizar a API Labook para interagir com usuários e publicações na rede social Labook.

O projeto encontra-se em fase de correção e pode estar sujeito a modificações e melhorias futuras.