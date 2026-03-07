#Clean Node API

API REST construída com **Node.js** e **TypeScript**, seguindo os princípios da **Clean Architecture**. O projeto prioriza desacoplamento, testabilidade e qualidade de código desde a base.

## Sobre o Projeto

Este repositório implementa uma API com arquitetura limpa, onde cada camada possui responsabilidades bem definidas e depende apenas de abstrações. O objetivo é construir uma aplicação escalável, de fácil manutenção e com alta cobertura de testes.

## Funcionalidades

- **Cadastro de usuário (Sign Up)** — validação de campos obrigatórios (`name`, `email`, `password`, `passwordConfirmation`), validação de formato de e-mail e retorno de erros HTTP semânticos (400, 500).
- **Tratamento de erros padronizado** — classes de erro customizadas (`MissingParamError`, `InvalidParamError`, `ServerError`) para respostas consistentes.
- **Helpers HTTP** — funções utilitárias (`badRequest`, `serverError`) que padronizam a construção de respostas HTTP.

## Arquitetura

O projeto segue a **Clean Architecture**, organizando o código em camadas com fronteiras claras de dependência:

```
src/
└── presentation/          # Camada de Apresentação
    ├── controllers/       # Orquestram o fluxo de requisições HTTP
    ├── errors/            # Classes de erro do domínio de apresentação
    ├── helpers/           # Funções utilitárias para respostas HTTP
    └── protocols/         # Interfaces e contratos (ports)
```

### Camadas previstas

| Camada           | Responsabilidade                                  | Status       |
| ---------------- | ------------------------------------------------- | ------------ |
| **Presentation** | Controllers, validação de entrada, respostas HTTP | Implementada |
| **Domain**       | Entidades e interfaces de casos de uso            | Planejada    |
| **Data**         | Implementação dos casos de uso e acesso a dados   | Planejada    |
| **Infra**        | Implementações concretas (banco, libs externas)   | Planejada    |
| **Main**         | Composição, factories e bootstrap da aplicação    | Planejada    |

## Design Patterns

| Pattern                  | Onde é aplicado                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Dependency Injection** | `SignUpController` recebe `EmailValidator` via construtor, eliminando acoplamento com implementações concretas |
| **Strategy**             | A interface `EmailValidator` permite trocar a implementação de validação de e-mail sem alterar o controller    |
| **Factory**              | Funções `makeSut()` e `makeEmailValidator()` nos testes criam instâncias de forma centralizada                 |
| **Adapter**              | A interface `Controller` adapta requisições HTTP para a lógica interna da aplicação                            |

### Princípios seguidos

- **SOLID** — especialmente Single Responsibility, Dependency Inversion e Interface Segregation
- **DRY** — helpers e factories evitam duplicação
- **Separation of Concerns** — cada arquivo tem uma única responsabilidade

## Tecnologias

| Tecnologia            | Versão | Finalidade                                                 |
| --------------------- | ------ | ---------------------------------------------------------- |
| TypeScript            | 5.9    | Tipagem estática e segurança em tempo de compilação        |
| Jest                  | 30.2   | Framework de testes com suporte a mocks e spies            |
| ts-jest               | 29.4   | Transformação TypeScript para o Jest                       |
| ESLint                | 9.35   | Análise estática e padronização de código                  |
| Prettier              | 3.8    | Formatação automática de código                            |
| Husky                 | 9.1    | Git hooks para garantir qualidade antes de commits         |
| lint-staged           | 16.2   | Executa lint e testes apenas em arquivos staged            |
| git-commit-msg-linter | 5.0    | Padronização de mensagens de commit (Conventional Commits) |

## Testes

O projeto utiliza **Jest** com **ts-jest** e segue uma abordagem de testes unitários isolados:

- **Stubs** para isolar dependências externas (`EmailValidatorStub`)
- **Spies** com `jest.spyOn()` para verificar chamadas de métodos
- **Factory functions** (`makeSut`) para evitar repetição na criação de objetos de teste
- **Cobertura de código** habilitada por padrão

```bash
# Executar testes em modo watch
yarn test

# Executar testes uma vez (para CI/staged)
yarn run test:staged
```

## Scripts Disponíveis

```bash
yarn test              # Testes em modo watch
yarn run test:staged   # Testes (single run)
yarn run lint          # Verificar problemas de lint
yarn run lint:fix      # Corrigir problemas de lint automaticamente
yarn run format        # Formatar código com Prettier
yarn run format:check  # Verificar formatação
```

## Como Executar

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/api-clean-node.git

# Instalar dependências
yarn install

# Executar testes
yarn test
```

## Executar com Docker

```bash
# Subir API + MongoDB
docker compose up --build
```

A API ficará disponível em `http://localhost:5050` e o MongoDB em `mongodb://localhost:27017/clean-node-api`.

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.

---

Feito por **Alisson Santos**
