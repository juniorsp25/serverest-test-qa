describe('Fluxo de Compra - Frontend', () => {
  before(() => {
    const ts = Date.now();

    // === Massa: cliente e admin com emails únicos e válidos
    cy.fixture('usuarios').then((u) => {
      const cliente = {
        ...u.cliente,
        email: u.cliente.email.replace(/@.*/, `_${ts}@example.com`)
      };
      const admin = {
        ...u.admin,
        email: u.admin.email.replace(/@.*/, `_${ts}@example.com`)
      };

      cy.wrap(cliente).as('cliente');
      cy.wrap(admin).as('admin');

      // cria cliente (ignora 400 de duplicidade)
      cy.apiCreateUser(cliente);

      // cria admin -> login -> guarda token
      cy.apiCreateUser(admin)
        .then(() => cy.apiLogin({ email: admin.email, password: admin.password }))
        .then(({ body }) => {
          const token = body.authorization || body.token;
          expect(token, 'token de admin').to.exist;
          cy.wrap(token).as('token');
        });
    });

    // === Produto com nome único ===
    cy.fixture('produtos').then((p) => {
      const produto = { ...p.novo, nome: `${p.novo.nome} ${ts}` };
      cy.wrap(produto).as('produto');
    });

    // === Cria produto via API com o token já disponível ===
    cy.get('@token').then((token) => {
      cy.get('@produto').then((produto) => {
        cy.apiCreateProduct(produto, token)
          .its('status')
          .should('be.oneOf', [201, 400]); // 400 se nome já existe
      });
    });
  });

  it('logar como cliente, adicionar produto ao carrinho e validar que a compra não foi finalizada', () => {
    // login cliente
    cy.get('@cliente').then((cliente) => {
      cy.visit('/');
      cy.loginUI(cliente.email, cliente.password);
    });

    // adicionar produto ao carrinho 
    cy.get('@produto').then((produto) => {
      // eperar a listagem atualizar
      cy.intercept('GET', '**/produtos*').as('getProdutos');
      cy.wait('@getProdutos', { timeout: 10000 }).its('response.statusCode').should('be.oneOf', [200]);

      cy.contains(produto.nome, { matchCase: false })
        .should('be.visible')
        .closest('tr, [data-testid="product-card"], .card, li')
        .within(() => {
          cy.contains('button, [role="button"]', /(adicionar|comprar|add to cart|carrinho)/i)
            .click({ force: true });
        });
    });


        // finalizar compra
      cy.contains(/carrinho|ver carrinho/i).click({ force: true });

        // tenta localizar checkout; se não existir, tira print e força falha
      cy.get('body', { timeout: 10000 }).then(($body) => {
        const els = $body.find('button, [role="button"], a').toArray();
          const btnCheckout = els.find(el =>
            /(finalizar|checkout|concluir)/i.test(el.innerText || el.value || '')
  );

  if (!btnCheckout) {
  return cy
    .screenshot(`checkout-nao-encontrado_${Date.now()}`, { capture: 'viewport' })
    .then(() => {
      throw new Error('Checkout não encontrado: página de Carrinho está "Em construção".');
    });
}


  cy.wrap(btnCheckout).click();
  cy.contains(/pedido realizado|compra concluída|sucesso/i).should('be.visible');
});

  });
});
