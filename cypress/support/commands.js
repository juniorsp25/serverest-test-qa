/**
 * Comandos customizados para reutilização nos testes.
 */

Cypress.Commands.add('apiCreateUser', (usuarios) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/usuarios`,
    body: usuarios,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiLogin', (login) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: login,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiCreateProduct', (Produto, token) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/produtos`,
    headers: { Authorization: token ? token : '' },
    body: produto,
    failOnStatusCode: false,
  });
});

/**
 * Login via UI no front.serverest.dev
 * Usa seletores por placeholder/role para reduzir acoplamento.
 */
Cypress.Commands.add('loginUI', (email, senha) => {
  cy.visit('/login');
  // Fallbacks de seletor para diferentes versões da UI
  cy.get('input[placeholder*="email" i], input[type="email"]').first().type(email);
  cy.get('input[placeholder*="senha" i], input[type="password"]').first().type(senha, { log: false });
  cy.contains('button, [role="button"]', /entrar|login|acessar/i).click();
});
