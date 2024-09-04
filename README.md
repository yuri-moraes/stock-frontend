# Controle de Estoque

Este projeto é uma aplicação web desenvolvida para o controle de estoque de itens, implementando funcionalidades CRUD para gerenciar entidades de usuários e itens. A administração do sistema é realizada por um administrador, que tem permissões para gerenciar contas de usuários e atualizar os itens do estoque. Usuários comuns, por outro lado, têm permissões limitadas, podendo apenas realizar login, alterar sua senha, e criar e visualizar itens disponíveis.

Acesse a aplicação através do seguinte link: [Clique aqui](https://react-stock-dev.vercel.app/)

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Front-end:**
  - React: Biblioteca para construção de interfaces de usuário.
  - React Router DOM: Biblioteca para gerenciar navegação entre páginas.
  - Axios: Cliente HTTP para realizar requisições à API.
  - Prop-Types: Biblioteca para validação de tipos de propriedades em componentes React.
  - Tailwind CSS: Framework de utilidades para estilização rápida e eficiente de componentes.

- **Back-end:**
  - Node.js: Plataforma de execução de código JavaScript no servidor.
  - Express: Framework web para Node.js, utilizado na construção da API.

- **Ferramentas e Utilitários:**
  - Vite: Ferramenta de build e servidor de desenvolvimento.
  - ESLint: Ferramenta de análise estática para identificar padrões problemáticos em JavaScript/JSX.
  - CORS: Middleware para permitir requisições de recursos entre origens diferentes.

- **Gerenciamento de Estado e Contexto:**
  - Context API do React: Utilizada para gerenciar o estado global da aplicação.

## Tailwind CSS

O Tailwind CSS é um framework de CSS utilitário que permite criar estilos de forma eficiente diretamente nos arquivos JSX. Em vez de escrever CSS tradicional, você aplica classes de utilidade diretamente aos elementos para estilização.

### Configuração do `tailwind.config.js`

O arquivo `tailwind.config.js` é utilizado para configurar o Tailwind CSS, permitindo customizações e extensões das configurações padrão. No projeto, este arquivo pode ser ajustado para adicionar temas personalizados, estender estilos, adicionar plugins, entre outros.

Exemplo de configuração básica no `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
      },
    },
  },
  plugins: [],
}
