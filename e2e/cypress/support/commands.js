// Easy login when we don't want to manually login before each test
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('api_base')}/login`, {
    username,
    password
  })
    .then(({ body }) => {
      // our frontend stores the whole api-result into localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(body));
      cy.visit(Cypress.env('web_base'));
    });
});