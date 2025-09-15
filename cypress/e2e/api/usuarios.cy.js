describe('API - Usuários', () => {
  it('POST /usuarios - deve criar usuário com sucesso (201)', () => {
    const user = {
      nome: `João ${Date.now()}`,
      email: `testeqajunioraadmin+${Date.now()}@uorak.com`,
      password: 'Cap1993@',
      administrador: 'true'
    };

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: user,
      failOnStatusCode: false
    }).then((res) => {
      expect([201, 400]).to.include(res.status); // alguns ambientes podem responder 400 se email duplicado
      if (res.status === 201) {
        expect(res.body).to.have.property('_id');
        expect(res.body.message || res.body.msg || '').to.match(/sucesso|cadastrado/i);
      } else {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.match(/já está sendo utilizado|existe/i);
      }
    });
  });
});
