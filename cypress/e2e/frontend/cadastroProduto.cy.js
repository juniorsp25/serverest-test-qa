describe('Cadastro de Produto - Frontend', () => {
  beforeEach(() => {
    cy.fixture('usuarios').then((u) => {
      cy.apiCreateUser({
        nome: u.admin.nome,
        email: u.admin.email,
        password: u.admin.password,
        administrador: u.admin.administrador
      });
      cy.loginUI(u.admin.email, u.admin.password);
    });
  });

  it('deve cadastrar um novo produto e exibi-lo na lista', () => {
    cy.fixture('produtos').then((p) => {
      // navegar até a tela de produtos 
      cy.contains('a, button', /produtos|lista de produtos|cadastrar produto/i).click({ force: true }).then(() => {
        // Tenta mapear campos por label, placeholder ou name
        cy.get('input[name="nome"], input[placeholder*="nome" i]').first().type(p.novo.nome, { force: true });
        cy.get('input[name="preco"], input[placeholder*="preço" i], input[type="number"]').first().clear().type(p.novo.preco.toString(), { force: true });
        cy.get('textarea[name="descricao"], textarea[placeholder*="descrição" i], input[placeholder*="descrição" i]').first().type(p.novo.descricao, { force: true });
        cy.get('input[name="quantidade"], input[placeholder*="quantidade" i], input[type="number"]').eq(1).clear().type(p.novo.quantidade.toString(), { force: true });

        cy.contains('button, [role="button"]', /cadastrar|salvar|criar/i).click({ force: true });
      });

      // Verifica se o produto aparece na lista
      cy.contains('tr', p.novo.nome).should('be.visible').within(() => {
        cy.get('td').eq(1).should('contain', p.novo.preco);
        cy.get('td').eq(2).should('contain', p.novo.descricao);
      
        });




      
    });
  });
});

