# serverest-test-qa
Testes E2E automatizados com Cypress para validação da API Serverest.
Este repositório tem como objetivo validar endpoints principais, garantir qualidade contínua e gerar evidências automatizadas (prints e relatórios).

Configuração do ambiente
1. Clone o repositório e acesse o diretório:

2. Tecnologias utilizadas

Node.js
 >=18

Cypress
 >=13

git clone https://github.com/juniorsp25/serverest-testQA.git
cd serverest-testQA

2. Instale as dependências:
npm install

3. Executando os testes
Rodar todos os testesFront + API - npx cypress run
Rodar somente os testes de API
 Somente uma única API - npx cypress run --spec "cypress/e2e/api/**/*.cy.js"
Todas as APIs da pasta - npm run test:api

Modo Interativo Cypress 
npx cypress open 

4. Evidências geradas

Durante a execução, o projeto gera:
Screenshots (em caso de falha)

Relatórios ficam disponíveis em:

/reports/
  ├── screenshots/
 


