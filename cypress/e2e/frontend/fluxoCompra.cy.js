describe('Fluxo de Compra - Frontend', () => {
  before(() => {
    // garante que existe um cliente e um produto via API
    cy.fixture('usuarios').then((u) => {
      cy.apiCreateUser({
        nome: u.cliente.nome,
        email: u.cliente.email,
        password: u.cliente.password,
        administrador: u.cliente.administrador
      });
    });

    cy.fixture('produtos').then((p) => {
      // cria admin e produto para disponibilizar na vitrine
      cy.fixture('usuarios').then((u) => {
        cy.apiCreateUser({
          nome: u.admin.nome,
          email: u.admin.email,
          password: u.admin.password,
          administrador: u.admin.administrador
        }).then(() => {
          cy.apiLogin({ email: u.admin.email, password: u.admin.password }).then((res) => {
            const token = res.body.authorization || res.body.token || res.body.authentication || res.body?.authorization;
            cy.wrap(token).as('token');
          });
        });
      });

      cy.get('@token').then((token) => {
        cy.apiCreateProduct({
          nome: p.novo.nome,
          preco: p.novo.preco,
          descricao: p.novo.descricao,
          quantidade: p.novo.quantidade
        }, token);
      });
    });
  });

  it('deve logar como cliente, adicionar produto ao carrinho e finalizar compra', () => {
    cy.fixture('usuarios').then((u) => {
      cy.visit('/');
      // login como cliente via UI
      cy.loginUI(u.cliente.email, u.cliente.password);

      // adicionar produto ao carrinho
      cy.fixture('produtos').then((p) => {
        cy.contains(p.novo.nome, { matchCase: false }).should('be.visible').parentsUntil('body').within(() => {
          cy.contains('button, [role="button"]', /adicionar|comprar|add to cart|carrinho/i).click({ force: true });
        });

        // abrir carrinho e finalizar
        cy.contains('a, button', /carrinho|ver carrinho|finalizar/i).click({ force: true });
        cy.contains('button, [role="button"]', /finalizar|checkout|concluir/i).click({ force: true });
        cy.contains(/pedido realizado|compra concluída|sucesso/i).should('be.visible');
      });
    });
  });
});
