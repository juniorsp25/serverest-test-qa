describe('Login - Frontend', () => {
  it('deve autenticar com usuário válido e redirecionar para a área logada', () => {
    cy.fixture('usuarios').then((u) => {
      // cria um usuário admin via API para garantir que os dados são válidos 
      cy.apiCreateUser({
        nome: u.admin.nome,
        email: u.admin.email,
        password: u.admin.password,
        administrador: u.admin.administrador
      }).then(() => {
        cy.loginUI(u.admin.email, u.admin.password);
        // Verificações genéricas pós login
        //aceita “bem-vindo”, “bem vindo” ou “bemvindo
        cy.contains(/bem[- ]?vindo|dashboard|administrador|lista de/i).should('be.visible');
        cy.url().should('match', /front\.serverest\.dev|home|admin|listar/i);
      });
    });
  });
});
