# Sistema de Logística

![image](https://github.com/user-attachments/assets/b084b41b-9b6f-4441-b5b4-2aeca87d6e23)


## 📋 Sobre o Projeto

Uma aplicação web voltada para a área de logística, onde o cliente pode cadastrar compras e vendas. A aplicação deve permitir vincular vendas a compras existentes, respeitando os saldos disponíveis.

## 🚀 Tecnologias Utilizadas

### Principais Tecnologias

- React Js
- TypeScript
- Vite
- React router
- Context API
- Hooks
- Tailwind CSS
- Shadcn UI
- Vercel

### Bibliotecas de Validação e Formulários

- React hook form
- Zod (Validação de Esquemas)

### Bibliotecas Adicionais

- Sonner
- Framer motion
- Lucide react (Ícones)
- Class Variance Authority (Variantes para os componentes)

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios

```
src/
│
├── assets/             # Recursos estáticos
├── components/         # Componentes reutilizáveis
│   ├── dashboard
│   ├── links
│   ├── products
│   └── ...
│
├── context/            # Contextos da aplicação
│   ├── LogisticsContext.tsx
│   ├── ProductsContext.tsx
│   └── ...
│
├── hooks/              # Hooks da aplicação
│   ├── useLogistics.ts
│   ├── useProducts.ts
│   └── ...
│
├── lib/                # Serviços e utilitários terceiros
│   └── utils.ts
│
├── pages/              # Paginas da aplicação
│   ├── Dashboard.tsx
│   ├── Purchase.tsx
│   └── Products.tsx
│
├── schemas/            # Schemas da aplicação
│   ├── productsSchema.tsx
│   ├── salesSchema.tsx
│   └── ...
│
├── styles/             # Estilos para a aplicação
│   └── index.css
│
├── utils/              # funções utilitárias para a aplicação
│   ├── formatCurrency.ts
│   └── formatDate.ts
```

## ✨ Funcionalidades

### Gerenciamento

- Criação das vendas
- Listagem das vendas
- Vinculação das vendas
- Criação das compras
- Listagem das compras
- Dashboard de cadastro gerais
- Listagem de vínculos realizados

## 🔧 Configuração do Projeto

### Pré-requisitos

- Node.js (versão 20 ou superior)
- npm

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/Joaopsguimaraes/desafio-sistema-logistica.git
```

2. Instale as dependências

```bash
cd desafio-sistema-logistica
npm install
```

3. Inicie o ambiente de desenvolvimento

```bash
npm run dev
```

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run preview`: Visualiza a build de produção localmente
- `npm run lint`: Executa o linter

## 📝 Padrões de Desenvolvimento

### Context

- Utilização da Context API
- Separação de responsabilidades e logica
- Persistência em local storage

### Componentes

- Componentes pequenos e focados nas responsabilidades
- Utilização de hooks, como useState, useMemo, useEffect e entre outros
- Componentização de elementos comuns

### Hooks

- Utilização do hooks para separação das responsabilidades
- Utilizando hooks para maior clareza na logica do componente
- Abstração da logica

## ✍️ Autor

João Guimarães - joaovpsguimaraes@gmail.com

Link do Projeto: [https://github.com/Joaopsguimaraes/desafio-sistema-logistica](https://github.com/Joaopsguimaraes/desafio-sistema-logistica)
