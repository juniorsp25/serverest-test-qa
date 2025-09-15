# serverest-test-qa

Testes E2E automatizados com Cypress para validação da API Serverest.
Este repositório tem como objetivo validar endpoints principais, garantir qualidade contínua e gerar evidências automatizadas.

Configuração do ambiente
1. Clone o repositório e acesse o diretório:
   https://github.com/juniorsp25/rethinkbank-api-tests.git

3. Tecnologias utilizadas

Node.js
 >=18

Cypress
 >=13


2. Instale as dependências:
npm install

3. Executando os testes

# todos os testes (API + Front)
npx cypress run

# somente API
npm run test:api
# ou
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"

# Frontend (E2E) GUI Cypress
npx cypress open

# ou por arquivo
npx cypress run --spec "cypress/e2e/frontend/login.cy.js"

npx cypress run --spec "cypress/e2e/frontend/cadastroProduto.cy.js"

npx cypress run --spec "cypress/e2e/frontend/fluxoCompra.cy.js"

4. Evidências geradas

Durante a execução, o projeto gera:
Screenshots (em caso de falha)

Relatórios ficam disponíveis em:

/reports/screenshots/

Cenários :

Acessar tela de login.

Cenário 1 :
Preencher usuário e senha corretos.

Resultado esperado : Validar label da tela home Bem vindo que indica que estou logado no ambiente.

Cenário 2 :
Cadastro de novo produto

Acessar área administrativa.

Cadastrar produto com nome, preço e descrição.

Resultado esperado : Validar que o produto aparece na lista.

Cenário 3 : Falha

Fluxo de compra

Adicionar produto ao carrinho.

Resultado esperado : Coletar evidência que ao adicionar o produto ao carrinho, não foi possível concluir a compra
e tirar um print da tela, reportando que há algo de errado no fluxo.

Para forçar a falha de checkout (e gerar print explícito), execute:

npx cypress run --env forceCheckout=true --spec "cypress/e2e/frontend/fluxoCompra.cy.js"



Cenários de Teste – API

POST /usuarios – cria usuário (espera 201; tolera 400 por duplicidade controlada).

POST /login – autentica e valida token no corpo (authorization/token).

GET /produtos – lista produtos e valida estrutura básica.











 


