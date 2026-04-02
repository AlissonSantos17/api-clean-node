# Clean Node API

API REST construída com **Node.js** e **TypeScript**, seguindo os princípios da **Clean Architecture**. O projeto prioriza desacoplamento, testabilidade, qualidade de código e uma pipeline de validação contínua.

## Sobre o Projeto

Este repositório implementa uma API com arquitetura limpa, onde cada camada possui responsabilidades bem definidas e depende apenas de abstrações. Atualmente, o projeto já conta com fluxo completo de cadastro persistido em MongoDB, estrutura de autenticação no domínio/camada de dados, cobertura com testes unitários e de integração, além de automações de qualidade para CI e hooks locais.

## Funcionalidades

### Expostas via API

- **Cadastro de usuário (`POST /api/signup`)** — validação de campos obrigatórios (`name`, `email`, `password`, `passwordConfirmation`), comparação entre senha e confirmação, validação de e-mail, hash de senha com bcrypt e persistência em MongoDB.
- **Tratamento de erros padronizado** — respostas consistentes com códigos HTTP semânticos (`400`, `401`, `500`) e payload de erro uniforme.
- **Middlewares globais** — parser JSON, CORS liberado e `Content-Type: application/json` por padrão.

### Implementadas internamente

- **Caso de uso de autenticação (`DbAuthentication`)** — carregamento de conta por e-mail, comparação de hash e geração/atualização de token de acesso.
- **`LoginController`** — fluxo de autenticação com retorno de `401 Unauthorized` quando as credenciais são inválidas.
- **Log de erros com decorator** — falhas `500` são registradas na coleção `errors` via `LogControllerDecorator`.

> Observação: no estado atual, a rota pública de login ainda não está plugada em `main/routes`.

## Arquitetura

O projeto segue a **Clean Architecture**, organizando o código em camadas com fronteiras claras de dependência:

```text
src/
├── domain/                # Entidades e contratos de casos de uso
├── data/                  # Implementação dos casos de uso e protocolos de acesso
├── infra/                 # Implementações concretas (MongoDB, bcrypt)
├── presentation/          # Controllers, validações, erros e helpers HTTP
├── main/                  # Composição da aplicação (factories, adapters, rotas, config)
└── utils/                 # Adapters utilitários
```

### Status das camadas

| Camada           | Responsabilidade                                  | Status       |
| ---------------- | ------------------------------------------------- | ------------ |
| **Presentation** | Controllers, validações e respostas HTTP          | Implementada |
| **Domain**       | Contratos e modelos de negócio                    | Implementada |
| **Data**         | Casos de uso e protocolos de persistência/crypto  | Implementada |
| **Infra**        | Repositórios MongoDB e adapter de criptografia    | Implementada |
| **Main**         | Bootstrap, factories, adapters Express e rotas    | Implementada |

## Design Patterns

| Pattern                  | Onde é aplicado                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------- |
| **Dependency Injection** | Use cases e controllers recebem dependências por construtor                           |
| **Factory**              | `main/factories` concentra montagem dos fluxos e composição de dependências           |
| **Decorator**            | `LogControllerDecorator` adiciona logging sem alterar controllers concretos            |
| **Adapter**              | `adaptRoute` converte contrato de controller para handler do Express                  |
| **Composite**            | `ValidationComposite` combina múltiplas validações em uma única etapa                 |
| **Repository**           | `AccountMongoRepository` e `LogMongoRepository` isolam detalhes de persistência Mongo |

### Princípios seguidos

- **SOLID** — com foco em SRP e DIP para reduzir acoplamento.
- **Separation of Concerns** — validação, regra de negócio, acesso a dados e entrega HTTP em camadas distintas.
- **Testabilidade por contrato** — protocolos/interfaces em pontos estratégicos para facilitar mocks e stubs.

## Tecnologias

| Tecnologia  | Versão | Finalidade                                            |
| ----------- | ------ | ----------------------------------------------------- |
| Node.js     | 22.x   | Runtime (alvo da pipeline de CI e imagem Docker)      |
| TypeScript  | 5.9    | Tipagem estática e segurança em tempo de compilação   |
| Express     | 5.2    | Servidor HTTP e roteamento                            |
| MongoDB     | 7.1    | Persistência de dados                                 |
| bcrypt      | 6.0    | Hash e comparação de senhas                           |
| Jest        | 30.2   | Testes unitários, integração e cobertura              |
| Supertest   | 7.2    | Testes de rota HTTP                                   |
| ESLint      | 9.35+  | Análise estática de código                            |
| Prettier    | 3.8    | Formatação automática                                 |
| Husky       | 9.1    | Git hooks para automação local                        |
| lint-staged | 16.2+  | Lint + testes relacionados em arquivos staged         |

## Testes

O projeto utiliza **Jest** com **ts-jest**, com separação entre testes unitários e de integração:

- **Unitários (`*.spec.ts`)** — foco em controllers, use cases, adapters e validações.
- **Integração (`*.test.ts`)** — foco em rotas e repositórios com MongoDB.
- **Mongo em testes** — preset `@shelf/jest-mongodb` para provisionamento da base de testes.
- **Cobertura habilitada** — coleta de cobertura por padrão (`yarn test:ci`).

```bash
# Executar testes
yarn test

# Executar testes unitários em watch
yarn test:unit

# Executar testes de integração em watch
yarn test:integration

# Executar testes com cobertura (CI)
yarn test:ci
```

## Qualidade e CI

- **Pre-commit (`.husky/pre-commit`)** executa `yarn lint-staged`.
- **lint-staged** aplica `eslint --fix` e roda testes relacionados aos arquivos staged.
- **Pre-push (`.husky/pre-push`)** executa `yarn test:ci`.
- **GitHub Actions (`.github/workflows/ci.yml`)** valida `lint`, `format:check`, `build` e `test:ci` em push/PR para `main`.

## Scripts Disponíveis

```bash
yarn dev            # Build + start local
yarn start          # Executar servidor em TypeScript (sucrase-node)
yarn build          # Compilar para dist/
yarn start:prod     # Executar build compilada
yarn lint           # Verificar lint
yarn lint:fix       # Corrigir lint automaticamente
yarn format         # Formatar código
yarn format:check   # Verificar formatação
yarn test           # Executar testes
yarn test:unit      # Testes unitários (watch)
yarn test:integration # Testes de integração (watch)
yarn test:staged    # Testes relacionados aos arquivos alterados
yarn test:ci        # Testes com cobertura
```

## Como Executar

### Ambiente local

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/clean-node-api.git
cd clean-node-api

# Instalar dependências
yarn install

# Subir aplicação
yarn start
```

Variáveis de ambiente (com defaults no projeto):

- `PORT` (padrão: `5050`)
- `MONGO_URL` (padrão: `mongodb://localhost:27017/clean-node-api`)

### Executar com Docker

```bash
# Subir API + MongoDB
docker compose up --build
```

A API ficará disponível em `http://localhost:5050` e o MongoDB em `mongodb://localhost:27017/clean-node-api`.

## Endpoint disponível

### `POST /api/signup`

Exemplo de payload:

```json
{
  "name": "Alisson",
  "email": "alissonfelp00@gmail.com",
  "password": "123456",
  "passwordConfirmation": "123456"
}
```

Resposta de sucesso: `200 OK` com os dados da conta criada.

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.

---

Feito por **Alisson Santos**
