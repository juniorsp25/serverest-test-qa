describe('API - Login', () => {
  it('POST /login - deve autenticar usuário existente (200) e retornar token', () => {
    const unique = Date.now();
    const user = {
      nome: `Admin ${unique}`,
      email: `admin+${unique}@uorak.com`,
      password: 'Cap1993@',
      administrador: 'true'
    };

    // cria usuário e depois loga
    cy.request('POST', `${Cypress.env('apiUrl')}/usuarios`, user).then(() => {
      cy.request('POST', `${Cypress.env('apiUrl')}/login`, { email: user.email, password: user.password }).then((res) => {
        expect(res.status).to.eq(200);
        // token pode vir em 'authorization' ou 'token' dependendo da impl
        const token = res.body.authorization || res.body.token;
        expect(token, 'token/authorization presente').to.exist;
      });
    });
  });
});
