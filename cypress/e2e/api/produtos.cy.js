describe('API - Produtos', () => {
  it('GET /produtos - deve listar produtos (200) e validar schema básico', () => {
    cy.request('GET', `${Cypress.env('apiUrl')}/produtos`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('quantidade');
      expect(res.body).to.have.property('produtos');
      expect(res.body.produtos).to.be.an('array');
    });
  });
});
