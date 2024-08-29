---

# Controle de Estoque

Este projeto é uma aplicação web desenvolvida para o controle de estoque de itens, implementando funcionalidades CRUD para gerenciar entidades de usuários e itens. A administração do sistema é realizada por um administrador, que tem permissões para gerenciar contas de usuários e atualizar os itens do estoque. Usuários comuns, por outro lado, têm permissões limitadas, podendo apenas realizar login, alterar sua senha, e criar e visualizar itens disponíveis.

Acesse a aplicação através do seguinte link: [Clique aqui](https://react-stock-jph97vote-yurimoraes-projects.vercel.app/#/)

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Front-end:**
  - React: Biblioteca para construção de interfaces de usuário.
  - React Router DOM: Biblioteca para gerenciar navegação entre páginas.
  - Axios: Cliente HTTP para realizar requisições à API.
  - Prop-Types: Biblioteca para validação de tipos de propriedades em componentes React.

- **Back-end:**
  - Node.js: Plataforma de execução de código JavaScript no servidor.
  - Express: Framework web para Node.js, utilizado na construção da API.

- **Ferramentas e Utilitários:**
  - Vite: Ferramenta de build e servidor de desenvolvimento.
  - ESLint: Ferramenta de análise estática para identificar padrões problemáticos em JavaScript/JSX.
  - CORS: Middleware para permitir requisições de recursos entre origens diferentes.

- **Gerenciamento de Estado e Contexto:**
  - Context API do React: Utilizada para gerenciar o estado global da aplicação.

## Documentação da API

Como este é um projeto colaborativo, o desenvolvimento da API está sendo conduzido separadamente. Para mais detalhes sobre a API, acesse o repositório oficial:

- [Repositório da API (@stock-api)](https://github.com/yuri-moraes/stock_api/tree/main)

## Autores

- [Yuri Moraes](https://www.github.com/yuri-moraes)
- [Marcos dos Santos](https://www.github.com/marcos90s)

## Deploy

Para configurar o projeto, ajuste o arquivo de configuração da API em `./src/api` para apontar para a porta correta do seu servidor back-end. Exemplo de configuração:

```javascript
baseURL: "http://localhost:3000"
```

Para iniciar o projeto em ambiente de desenvolvimento, utilize o seguinte comando:

```bash
npm run dev
```

## Contribuindo

Contribuições são sempre bem-vindas! Todos os `pull requests` serão revisados e, se a sua contribuição for significativa, ela será incorporada ao projeto.

Por favor, siga as diretrizes definidas na seção `Objetivo` deste README para garantir que sua contribuição esteja alinhada com o propósito do projeto.

---
