describe('Fluxo de Compra - Frontend', () => {

  before(() => {

    const ts = Date.now();

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

      cy.apiCreateUser(cliente);

      cy.apiCreateUser(admin)
        .then(() =>
          cy.apiLogin({
            email: admin.email,
            password: admin.password
          })
        )
        .then(({ body }) => {

          const token = body.authorization || body.token;

          expect(token).to.exist;

          cy.wrap(token).as('token');

        });

    });

    cy.fixture('produtos').then((p) => {

      const produto = {
        ...p.novo,
        nome: `${p.novo.nome} ${ts}`
      };

      cy.wrap(produto).as('produto');

    });

    cy.get('@token').then((token) => {

      cy.get('@produto').then((produto) => {

        cy.apiCreateProduct(produto, token)
          .its('status')
          .should('be.oneOf', [201, 400]);

      });

    });

  });

  it('logar como cliente, adicionar produto ao carrinho e validar que a compra não foi finalizada', () => {

    cy.get('@cliente').then((cliente) => {

      cy.visit('/');

      cy.loginUI(cliente.email, cliente.password);

    });

    cy.get('@produto').then((produto) => {

      cy.intercept('GET', '**/produtos*').as('getProdutos');

      cy.wait('@getProdutos', { timeout: 10000 })
        .its('response.statusCode')
        .should('be.oneOf', [200]);

      cy.contains(produto.nome, { matchCase: false })
        .should('be.visible')
        .closest('tr, [data-testid="product-card"], .card, li')
        .within(() => {

          cy.contains(
            'button, [role="button"]',
            /(adicionar|comprar|add to cart|carrinho)/i
          ).click({ force: true });

        });

    });

    cy.contains(/carrinho|ver carrinho/i)
      .click({ force: true });

    cy.get('body', { timeout: 10000 }).then(($body) => {

      const els = $body.find('button, [role="button"], a').toArray();

      const btnCheckout = els.find((el) =>
        /(finalizar|checkout|concluir)/i.test(
          el.innerText || el.value || ''
        )
      );

      if (!btnCheckout) {

        return cy
          .screenshot(`checkout-nao-encontrado_${Date.now()}`, {
            capture: 'viewport'
          })
          .then(() => {

            throw new Error(
              'Checkout não encontrado: página de carrinho indisponível.'
            );

          });

      }

      cy.wrap(btnCheckout).click();

      cy.contains(/pedido realizado|compra concluída|sucesso/i)
        .should('be.visible');

    });

  });

});
