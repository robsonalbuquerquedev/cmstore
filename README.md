# CMStore

CMStore é um aplicativo de e-commerce desenvolvido com **Next.js**, permitindo que usuários naveguem pelos produtos, adicionem itens à lista de desejos e enviem pedidos diretamente via **WhatsApp**. Possui um carrossel interativo de produtos, controle de estoque e integração com **Firebase Realtime Database** para gerenciamento de dados.

## Funcionalidades

- Exibição de produtos com imagem, descrição, preço e estoque.
- Carrossel de produtos com progresso automático e setas de navegação.
- Lista de desejos interativa que envia a seleção via WhatsApp.
- Interface responsiva para desktop e dispositivos móveis.
- Gerenciamento de produtos via painel de admin (adicionar/editar/remover).

## Tecnologias

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [Firebase Realtime Database](https://firebase.google.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Icons](https://react-icons.github.io/react-icons)
- [React Slick](https://react-slick.neostack.com/) para o carrossel

## Como rodar localmente

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/robsonalbuquerquedev/cmstore.git
cd cmstore
npm install
```
Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra http://localhost:3000 no navegador.

## Estrutura do projeto

- app/ - componentes de página do Next.js
- components/ - componentes reutilizáveis (cards, modais, botões)
- lib/ - configuração do Firebase e utilitários
- public/ - imagens e assets estáticos

## Contribuição 

Sinta-se à vontade para abrir issues e pull requests.
Feedback e melhorias são sempre bem-vindos!

## Licença MIT

[MIT LINCENSE](LICENSE)
